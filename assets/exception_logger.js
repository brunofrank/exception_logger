ExceptionLogger = {
  filters: ['exception_names', 'controller_actions', 'date_ranges'],
  setPage: function(num) {
    $('#page').val(num);
    $('#query-form').submit();
  },
  
  setFilter: function(context, name) {
    var filterName = '#'+ context + '_filter'
    $(filterName).val($(filterName).val() == name ? '' : name);
    this.deselect(context, filterName);
    $('#page').val('1');
    $('#query-form').submit();
  },

  deselect: function(context, filterName) {
    $('#' + context + ' a').each(function(i, a) {
      var value = $(filterName) ? $(filterName).val() : null;
      $(a).addClass(value && ($(a).attr('title') == value || $(a).text() == value)) ? 'selected' : '';
    });
  },
  
  deleteAll: function() {
    var params = [];
    $('tr.exception').each(function(i, tr) { 
        params.push($(tr).attr('id').replace(/^\w+-/g, ''));            
    });
    
    return $('#query-form').serialize() + '&' + params.toQueryString('ids');    
  }
}

$(document).ready(function(){
    $.each(ExceptionLogger.filters, function(i, item){ 
        $('#' + item + '_filter').val('');        
    });
});

Array.prototype.toQueryString =  function(name) {
    var queryString = ""
    $.each(this, function(i, item){ 
        if (queryString != "")
            queryString += "&"
                        
        queryString += name + "[]=" + encodeURIComponent(item);
    });    
    
    return queryString;
}

$('activity').bind("ajaxStart", function(){
    $('activity').fadeIn(1000);
});

$('activity').bind("ajaxComplete", function(){
    $('activity').fadeOut(1000);
});
