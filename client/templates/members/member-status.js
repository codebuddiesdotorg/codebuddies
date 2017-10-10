
Template.memberStatus.events({
	'keyup textarea#status-text': function(event) {
        //Check value and if 140 characters have been typed, the user can't type anymore
        let learnedCounterValue = 140;
		let maxChars = 140;
        var currentLength = $("textarea#status-text").val().length;
        statusCounterValue = maxChars - currentLength;
        $('.statusCharactersLeft').text(statusCounterValue).append(' <small><em>(Hit enter to submit)</em></small>');
	},
  'keypress textarea#status-text': function(event) {
	 	if (event.which === 13) {
      var memberStatus = $('#status-text').val();

      if ($.trim(memberStatus) == '') {
        $('#topic').focus();
        sweetAlert({
          title: TAPi18n.__("Please share your current status"),
          confirmButtonText: TAPi18n.__("ok"),
          type: 'error'
        });
        return;
      }
      var data = {
        user_id: Meteor.userId(),
        status: memberStatus,
        study_group_id: FlowRouter.getParam('studyGroupId')
      }

      Meteor.call("editStatus", data, function(error, result) {
        if (error) {
          console.log(error);
					return Bert.alert( error.reason, 'danger', 'growl-top-right' );
        }
        if (result) {
          swal({
             type: "success",
             text: "Thank you for sharing your status!",
             timer: 500,
             showConfirmButton: false
           });
           $('#status-text').val('').blur();
           $('.statusCharactersLeft').text(140);
        }
      });

    }
  }
});
