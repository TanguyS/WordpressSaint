# Avoid `console` errors in browsers that lack a console.
do ->
  method = undefined

  noop = ->

  methods = [
    'assert'
    'clear'
    'count'
    'debug'
    'dir'
    'dirxml'
    'error'
    'exception'
    'group'
    'groupCollapsed'
    'groupEnd'
    'info'
    'log'
    'markTimeline'
    'profile'
    'profileEnd'
    'table'
    'time'
    'timeEnd'
    'timeStamp'
    'trace'
    'warn'
  ]
  length = methods.length
  console = window.console = window.console or {}
  while length--
    method = methods[length]
    # Only stub undefined methods.
    if !console[method]
      console[method] = noop
  return
# Place any jQuery/helper plugins in here.

jQuery.expr[':'].regex = (elem, index, match) ->
  matchParams = match[3].split(',')
  validLabels = /^(data|css):/
  attr = 
    method: if matchParams[0].match(validLabels) then matchParams[0].split(':')[0] else 'attr'
    property: matchParams.shift().replace(validLabels, '')
  regexFlags = 'ig'
  regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags)
  regex.test jQuery(elem)[attr.method](attr.property)



###*****************************************************************************************###
# Redirect
###*****************************************************************************************###

$(document).on 'click', '.redirect', ->
  location = $(this).find('.link').attr('href')
  if location.indexOf('#') > -1 and window.location.pathname == '/'
    return true
  if $(this).find('.link').attr('target') == '_blank'
    window.open location
  else
    window.location.href = location
  false



###*****************************************************************************************###
# Forms
###*****************************************************************************************###

# Handle forms
$(document).on 'focusout', 'input[type=\'text\']', ->
  if $(this).val() == ''
    $(this).attr 'value', $(this).attr('default')
  return

$(document).on 'focusout', 'textarea', ->
  if $(this).text() == ''
    $(this).text $(this).attr('default')
  return

$(document).on 'click', 'input[type=\'text\']', ->
  if $(this).val() == $(this).attr('default')
    $(this).attr 'value', ''
    $(this).css 'color', '#808080'
  return

$(document).on 'click', 'textarea', ->
  if $(this).text() == $(this).attr('default')
    $(this).text ''
    $(this).css 'color', '#808080'
  return