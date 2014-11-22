<?php

/**
 * Handle file uploads via XMLHttpRequest
 */
class qqUploadedFileXhr {
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {    
        $input = fopen("php://input", "r");
        $temp = tmpfile();
        $realSize = stream_copy_to_stream($input, $temp);
        fclose($input);
        
        if ($realSize != $this->getSize()){            
            return false;
        }
        
        $target = fopen($path, "w");        
        fseek($temp, 0, SEEK_SET);
        stream_copy_to_stream($temp, $target);
        fclose($target);
        
        return true;
    }
    function getName() {
        return securisationup($_GET['qqfile']);
    }
    function getSize() {
        if (isset($_SERVER["CONTENT_LENGTH"])){
            return (int)$_SERVER["CONTENT_LENGTH"];            
        } else {
            throw new Exception('Getting content length is not supported.');
        }      
    }   
}

/**
 * Handle file uploads via regular form post (uses the $_FILES array)
 */
class qqUploadedFileForm {  
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {
        if(!move_uploaded_file($_FILES['qqfile']['tmp_name'], $path)){
            return false;
        }
        return true;
    }
    function getName() {
        return securisationup($_FILES['qqfile']['name']);
    }
    function getSize() {
        return $_FILES['qqfile']['size'];
    }
}

class qqFileUploader {
    private $allowedExtensions = array();
    private $sizeLimit = 10485760;
    private $file;

    function __construct(array $allowedExtensions = array(), $sizeLimit = 10485760){
        $allowedExtensions = array_map("strtolower", $allowedExtensions);
            
        $this->allowedExtensions = $allowedExtensions;        
        $this->sizeLimit = $sizeLimit;
        
        $this->checkServerSettings();       

        if (isset($_GET['qqfile'])) {
            $this->file = new qqUploadedFileXhr();
        } elseif (isset($_FILES['qqfile'])) {
            $this->file = new qqUploadedFileForm();
        } else {
            $this->file = false; 
        }
    }
    
    private function checkServerSettings(){   
        $postSize = $this->toBytes(ini_get('post_max_size'));
        $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));        
        
        if ($postSize < $this->sizeLimit || $uploadSize < $this->sizeLimit){
            $size = max(1, $this->sizeLimit / 1024 / 1024) . 'M';             
            die("{'error':'increase post_max_size and upload_max_filesize to $size'}");    
        }        
    }
    
    private function toBytes($str){
        $val = trim($str);
        $last = strtolower($str[strlen($str)-1]);
        switch($last) {
            case 'g': $val *= 1024;
            case 'm': $val *= 1024;
            case 'k': $val *= 1024;        
        }
        return $val;
    }
    
    /**
     * Returns array('success'=>true) or array('error'=>'error message')
     */
    function handleUpload($uploadDirectory, $replaceOldFile = FALSE){
        if (!is_writable($uploadDirectory)){
            return array('error' => "Server error. Upload directory isn't writable.");
        }
        
        if (!$this->file){
            return array('error' => 'No files were uploaded.');
        }
        
        $size = $this->file->getSize();
        
        if ($size == 0) {
            return array('error' => 'File is empty');
        }
        
        if ($size > $this->sizeLimit) {
            return array('error' => 'File is too large');
        }
        
        $pathinfo = pathinfo($this->file->getName());
        $filename = $pathinfo['filename'];
        //$filename = md5(uniqid());
        $ext = $pathinfo['extension'];

        if($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)){
            $these = implode(', ', $this->allowedExtensions);
            return array('error' => 'File has an invalid extension, it should be one of '. $these . '.');
        }
        
        if(!$replaceOldFile){
            /// don't overwrite previous files that were uploaded
            while (file_exists($uploadDirectory . $filename . '.' . $ext)) {
                $filename .= rand(10, 99999);
            }
        }
        
        if ($this->file->save($uploadDirectory . $filename . '.' . $ext)){
            return array('success'=>true, 'filefinal'=> $filename . '.' . $ext);
        } else {
            return array('error'=> 'Could not save uploaded file.' .
                'The upload was cancelled, or server error encountered');
        }
        
    }    
}
// ajout secu
function securisationup($name) {
    $extensionsauth = array("docx" ,"xlsx" ,"pptx" ,"ttf" ,"otf" ,"fon" ,"pfb" ,"font" ,"afm" ,"otb" ,"bdf" ,"fnt" ,"abf" ,"bdf" ,"pfm" ,"pfa" ,"ofm" ,"pfa" ,"pfb" ,"cid" ,"ttc" ,"hqx" ,"pcf" ,"sfd" ,"dfont" ,"bin" ,"mpg3" ,"mpg" ,"mpeg" ,"jpg" ,"gif" ,"png" ,"3g2" ,"3gp" ,"4xm" ,"IFF" ,"ISS" ,"MTV" ,"RoQ" ,"aac" ,"ac3" ,"adts" ,"aiff" ,"alaw" ,"alsa" ,"amr" ,"apc" ,"ape" ,"asf" ,"ass" ,"au" ,"avi" ,"avm2" ,"avs" ,"bethsoftvid" ,"bfi" ,"c93" ,"cavsvideo" ,"crc" ,"daud" ,"dirac" ,"dnxhd" ,"dsicin" ,"dts" ,"dv" ,"dv1394" ,"dvd" ,"dxa" ,"ea" ,"ea_cdata" ,"eac3" ,"f32be" ,"f32le" ,"f64be" ,"f64le" ,"ffm" ,"film_cpk" ,"flac" ,"flic" ,"flv" ,"framecrc" ,"gif" ,"gsm" ,"gxf" ,"h261" ,"h263" ,"h264" ,"idcin" ,"image2" ,"image2pipe" ,"ingenient" ,"ipmovie" ,"ipod" ,"lmlm4" ,"m4v" ,"matroska" ,"mjpeg" ,"mlp" ,"mm" ,"mmf" ,"mov" ,"mov" ,"mp4" ,"m4a" ,"mp2" ,"mp3" ,"mp4" ,"mpc" ,"mpc8" ,"mpeg" ,"mpeg1video" ,"mpeg2video" ,"mpegts" ,"mpegtsraw" ,"mpegvideo" ,"mpjpeg" ,"msnwctcp" ,"mulaw" ,"mvi" ,"mxf" ,"mxf_d10" ,"nc" ,"nsv" ,"null" ,"nut" ,"nuv" ,"ogg" ,"oma" ,"oss" ,"psxstr" ,"pva" ,"r3d" ,"rawvideo" ,"rcv" ,"redir" ,"rl2" ,"rm" ,"rpl" ,"rtp" ,"rtsp" ,"s16be" ,"s16le" ,"s24be" ,"s24le" ,"s32be" ,"s32le" ,"s8" ,"sdp" ,"shn" ,"siff" ,"smk" ,"sol" ,"svcd" ,"swf" ,"thp" ,"tiertexseq" ,"tta" ,"txd" ,"u16be" ,"u16le" ,"u24be" ,"u24le" ,"u32be" ,"u32le" ,"u8" ,"vc1" ,"vcd" ,"video4linux" ,"video4linux2" ,"vmd" ,"vob" ,"voc" ,"wav" ,"wsaud" ,"wsvqa" ,"wv" ,"x11grab" ,"xa" ,"yuv4mpegpipe" ,"4xm" ,"8bps" ,"8svx_exp" ,"8svx_fib" ,"aac" ,"aasc" ,"ac3" ,"adpcm_4xm" ,"adpcm_adx" ,"adpcm_ct" ,"adpcm_ea" ,"adpcm_ea_maxis_" ,"adpcm_ea_r1" ,"adpcm_ea_r2" ,"adpcm_ea_r3" ,"adpcm_ea_xas" ,"adpcm_ima_amv" ,"adpcm_ima_dk3" ,"adpcm_ima_dk4" ,"adpcm_ima_ea_ea" ,"adpcm_ima_ea_se" ,"adpcm_ima_iss" ,"adpcm_ima_qt" ,"adpcm_ima_smjpe" ,"adpcm_ima_wav" ,"adpcm_ima_ws" ,"adpcm_ms" ,"adpcm_sbpro_2" ,"adpcm_sbpro_3" ,"adpcm_sbpro_4" ,"adpcm_swf" ,"adpcm_thp" ,"adpcm_xa" ,"adpcm_yamaha" ,"alac" ,"amv" ,"ape" ,"asv1" ,"asv2" ,"atrac3" ,"avs" ,"bethsoftvid" ,"bfi" ,"bmp" ,"c93" ,"camstudio" ,"camtasia" ,"cavs" ,"cinepak" ,"cljr" ,"cook" ,"cyuv" ,"dca" ,"dnxhd" ,"dsicinaudio" ,"dsicinvideo" ,"dvbsub" ,"dvdsub" ,"dvvideo" ,"dxa" ,"eac3" ,"eacmv" ,"eatgq" ,"eatgv" ,"eatqi" ,"escape124" ,"ffv1" ,"ffvhuff" ,"flac" ,"flashsv" ,"flic" ,"flv" ,"fraps" ,"g726" ,"gif" ,"h261" ,"h263" ,"h263i" ,"h263p" ,"h264" ,"huffyuv" ,"idcinvideo" ,"imc" ,"indeo2" ,"indeo3" ,"interplay_dpcm" ,"interplayvideo" ,"jpegls" ,"kmvc" ,"avc" ,"faac" ,"aac" ,"mpeg" ,"ljpeg" ,"loco" ,"mace3" ,"mace6" ,"mdec" ,"mimic" ,"mjpeg" ,"mjpegb" ,"mlp" ,"mmvideo" ,"motionpixels" ,"mp1" ,"mp2" ,"mp3" ,"mp3adu" ,"mp3on4" ,"mpc7" ,"mpc8" ,"mpeg4" ,"msmpeg4" ,"msmpeg4v1" ,"msmpeg4v2" ,"msrle" ,"msvideo1" ,"mszh" ,"nellymoser" ,"nuv" ,"pam" ,"pbm" ,"pcm_alaw" ,"pcm_dvd" ,"pcm_f32be" ,"pcm_f32le" ,"pcm_f64be" ,"pcm_f64le" ,"pcm_mulaw" ,"pcm_s16be" ,"pcm_s16le" ,"pcm_s16le_plana" ,"pcm_s24be" ,"pcm_s24daud" ,"pcm_s24le" ,"pcm_s32be" ,"pcm_s32le" ,"pcm_s8" ,"pcm_u16be" ,"pcm_u16le" ,"pcm_u24be" ,"pcm_u24le" ,"pcm_u32be" ,"pcm_u32le" ,"pcm_u8" ,"pcm_zork" ,"pcx" ,"pgm" ,"pgmyuv" ,"png" ,"ppm" ,"ptx" ,"qcelp" ,"qdm2" ,"qdraw" ,"qpeg" ,"qtrle" ,"rawvideo" ,"real_144" ,"real_288" ,"rl2" ,"roq_dpcm" ,"roqvideo" ,"rpza" ,"rv10" ,"rv20" ,"rv30" ,"rv40" ,"sgi" ,"shorten" ,"smackaud" ,"smackvid" ,"smc" ,"snow" ,"sol_dpcm" ,"sonic" ,"sonicls" ,"sp5x" ,"sunrast" ,"svq1" ,"svq3" ,"targa" ,"theora" ,"thp" ,"tiertexseqvideo" ,"tiff" ,"truemotion1" ,"truemotion2" ,"truespeech" ,"tta" ,"txd" ,"ultimotion" ,"vb" ,"vc1" ,"vcr1" ,"vmdaudio" ,"vmdvideo" ,"vmnc" ,"vorbis" ,"vp3" ,"vp5" ,"vp6" ,"vp6a" ,"vp6f" ,"vqavideo" ,"wavpack" ,"wma" ,"wmav2" ,"wmv" ,"wmv2" ,"wmv3" ,"wnv1" ,"ws_snd1" ,"xan_dpcm" ,"xan_wc3" ,"xl" ,"xsub" ,"zlib" ,"zmbv" ,"7z" ,"zip" ,"gzip" ,"bzip2" ,"tar" ,"arj" ,"cab" ,"chm" ,"cpio" ,"deb" ,"dmg" ,"hfs" ,"iso" ,"lzh" ,"lzma" ,"msi" ,"nsis" ,"rar" ,"rpm" ,"udf" ,"wim" ,"xar" ,"z" ,"a" ,"art" ,"avi" ,"avs" ,"b" ,"bmp" ,"bmp2" ,"bmp3" ,"c" ,"cache" ,"caption" ,"cin" ,"cip" ,"clip" ,"cmyk" ,"cmyka" ,"cur" ,"cut" ,"dcm" ,"dcx" ,"dng" ,"dot" ,"dps" ,"dpx" ,"epdf" ,"epi" ,"eps" ,"eps2" ,"eps3" ,"epsf" ,"epsi" ,"ept" ,"ept2" ,"ept3" ,"fax" ,"fits" ,"fractal" ,"g" ,"g3" ,"gif" ,"gif87" ,"gradient" ,"gray" ,"histogram" ,"icb" ,"ico" ,"icon" ,"info" ,"jng" ,"jpeg" ,"jpg" ,"k" ,"label" ,"m" ,"m2v" ,"map" ,"mat" ,"matte" ,"miff" ,"mng" ,"mono" ,"mpc" ,"mpeg" ,"mpg" ,"msl" ,"mtv" ,"mvg" ,"null" ,"o" ,"otb" ,"otf" ,"p7" ,"pal" ,"palm" ,"pam" ,"pattern" ,"pbm" ,"pcd" ,"pcds" ,"pcl" ,"pct" ,"pcx" ,"pdb" ,"pdf" ,"pfa" ,"pfb" ,"pgm" ,"picon" ,"pict" ,"pix" ,"pjpeg" ,"plasma" ,"png" ,"png24" ,"png32" ,"png8" ,"pnm" ,"ppm" ,"preview" ,"ps" ,"ps2" ,"ps3" ,"psd" ,"ptif" ,"pwp" ,"r" ,"ras" ,"rgb" ,"rgba" ,"rgbo" ,"rla" ,"rle" ,"scr" ,"sct" ,"sfw" ,"sgi" ,"stegano" ,"sun" ,"svg" ,"svgz" ,"text" ,"tga" ,"tiff" ,"tile" ,"tim" ,"ttc" ,"ttf" ,"uil" ,"uyvy" ,"vda" ,"vicar" ,"vid" ,"viff" ,"vst" ,"wbmp" ,"wmf" ,"wmz" ,"wpg" ,"x" ,"xbm" ,"xc" ,"xcf" ,"xpm" ,"xv" ,"xwd" ,"y" ,"ycbcr" ,"ycbcra" ,"yuv" ,"bib" ,"bmp" ,"csv" ,"dbf" ,"dif" ,"doc" ,"docbook" ,"emf" ,"eps" ,"gif" ,"jpg" ,"latex" ,"met" ,"odd" ,"odg" ,"odp" ,"ods" ,"odt" ,"ooxml" ,"ott" ,"pbm" ,"pct" ,"pdb" ,"pdf" ,"pgm" ,"png" ,"pot" ,"ppm" ,"ppt" ,"psw" ,"pts" ,"pwp" ,"pxl" ,"ras" ,"rtf" ,"sda" ,"sdc" ,"sdd" ,"sdw" ,"slk" ,"stc" ,"sti" ,"stp" ,"stw" ,"svg" ,"svm" ,"swf" ,"sxc" ,"sxi" ,"sxw" ,"tiff" ,"vor" ,"wmf" ,"xls" ,"xlt" ,"xpm");

    if (substr_count($name, '.' )> 1) {
        $prename = substr($name, 0, strrpos($name, '.'));
        $extension = substr($name, strrpos($name, '.'));
        $prename = str_replace(".", "", $prename);
        $name = $prename . $extension;
    }

    // Regardons si l'extension est dans celles qu'on a proposées
    $extension = substr($name,strrpos($name,'.')+1);
    if (in_array(strtolower($extension), $extensionsauth) == FALSE) {
        exit();
    }

    // Remplaçons les caractères spéciaux
    $name = preg_replace('/[^a-zA-Z0-9\.]/', '', $name);  

    // Si le nom est trop long
    if (strlen($name) > 25) {
        $name = substr($name, 25);
    }

    //si le fichier n'a plus de nom
    $prename = substr($name, 0, strrpos($name, '.'));
    if ($prename == '') {
        $prename = rand(0, 1000000);
        $name = $prename . $name;
    }

    return $name;
}

function ts_handle_upload() {
    if (isset($_GET['qqfile']) && !empty($_GET['qqfile'])) {
        // list of valid extensions, ex. array("jpeg", "xml", "bmp")
        $allowedExtensions = array();
        // max file size in bytes
        $sizeLimit = 10 * 1024 * 1024;

        $uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
        $result = $uploader->handleUpload(realpath('.') . '/wp-content/uploads/');

        // to pass data through iframe you will need to encode all html tags
        echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);

        die();
    }
}

add_action('init', 'ts_handle_upload');