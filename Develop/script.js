var currentDate = dayjs();
var currentHour = dayjs().hour();
$(function () {

  // Click event for the save buttons. Adds the textarea value for each
  // time-block to the local storage, with the key being the id of the time-block.
  $('button.saveBtn').on('click', function() {
    var parent = $(this).parent();
    var events = parent.find('textarea').val();
    var stringEvents = JSON.stringify(events);
    localStorage.setItem(parent.attr('id'), stringEvents);
  })
  
  // Function that compares the parameter's id to the current hour, and
  // adds the necessary class for time-blocks that are past, present, or future.
  function compareIdWithTime (id){
    if (id.attr('id') == currentHour){
      id.removeClass('past future').addClass('present');
    } else if (id.attr('id') < currentHour){
      id.removeClass('future present').addClass('past');
    } else {
      id.removeClass('past present').addClass('future');
    }
  }

  // Loops through each time-block and runs the compare function.
  for (var i = 9; i < 18; i++){
    var timeBlock = $('#'+ i);
    compareIdWithTime(timeBlock);
  }
  
  // Loops that display the local storage contents on their respective
  // time-blocks.
  for (var i = 9; i < 18; i++){ // This loop goes through each time-block
    var timeBlock = $('#'+ i);
    var events = timeBlock.find('textarea'); // this is the event textarea
    for (var j = 0; j <= localStorage.length; j++) { // This loops through the local storage
      if (timeBlock.attr('id') === localStorage.key(j)) { // Checks to see if any keys in the local storage match the id of the current time-block
        var rememberedEvents = JSON.parse(localStorage.getItem(i));
        events.text(rememberedEvents)
      }
    }
  }
  
  // Selects the current day element in the header, then adds the current
  // date to the element to display it on the page.
  var currentDayElement = $('#currentDay');
  currentDayElement.text(currentDate.format('dddd, MMMM D'));
});


