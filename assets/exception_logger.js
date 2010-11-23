ExceptionLogger = {
  filters: ['exception_names', 'controller_actions', 'date_ranges'],
  setPage: function(num) {
    $('#page').val(num);
    $("#query-form").trigger('onsubmit');
    this.clearFilters();
  },
  
  setFilter: function(context, name) {
    var filterName = '#'+ context + '_filter'
    $(filterName).val($(filterName).val() == name ? '' : name);
    $('#page').val('1');
    $("#query-form").trigger('onsubmit');    
    this.deselect(context, filterName);    
    this.clearFilters();    
  },

  deselect: function(context, filterName) {
    $('#' + context + ' a').each(function(i, a) {
      var value = $(filterName) ? $(filterName).val() : null;
      if (value && ($(a).attr('title') == value || $(a).text() == value)){
          $(a).addClass('selected');          
      } else {
          $(a).removeClass('selected');                    
      }
    });
  },
  
  deleteAll: function() {
    var params = [];
    $('tr.exception').each(function(i, tr) { 
        params.push($(tr).attr('id').replace(/^\w+-/g, ''));            
    });
    
    return $('#query-form').serialize() + '&' + params.toQueryString('ids');    
  },
  
  clearFilters: function(){
    $.each(ExceptionLogger.filters, function(i, item){ 
        $('#' + item + '_filter').val('');        
    });      
  }      
}

$(document).ready(function(){
    ExceptionLogger.clearFilters();
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

$("#activity").ajaxStart(function(){
   $(this).fadeIn(1000);
 });

$('#activity').ajaxStop(function() {
    $(this).fadeOut(1000);
});
