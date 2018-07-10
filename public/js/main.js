$(document).ready(function() {

    $('.form-head').click(function() {

        if($(this).closest('.signup-form').attr('id') == 'signup') {

            $('.signup-form').attr('id', 'name');
            $('.icon-action').addClass('back');

        } else if($(this).closest('.signup-form').attr('id') == 'success') {

            $('.signup-form').attr('id', 'signup');
            $('input').val('');

        }

    });

    $('.form-action').click(function() {

        var form_id = $('.signup-form').attr('id');
        $('.icon-action').addClass('back');

        if($('#control-' + form_id).val() != '') {

            switch(form_id) {
                case 'name':
                    form_id = "phone";
                    break;
                case "phone":
                    form_id = "email";
                    break;
                case "email":
                    form_id = "password";
                    break;
                case "password":
                    form_id = "password-repeat";
                    break;
                case "password-repeat":
                    form_id = "success";
                    break;
                case "success":
                    form_id = "signup";
                    break;
            }

            $('.icon-action').addClass('back');

        } else {

            switch(form_id) {
                case 'name':
                    form_id = "signup";
                    $('.icon-action').removeClass('back');
                    break;
                case "phone":
                    form_id = "name";
                    break;
                case "email":
                    form_id = "phone";
                    break;
                case "password":
                    form_id = "email";
                    break;
                case "password-repeat":
                    form_id = "password";
                    break;
                case "success":
                    form_id = "signup";
                    break;
            }

            $('.icon-action').removeClass('back');

        }

        $('.signup-form').attr('id', form_id);

    });

    $('input').keyup(function() {

        $('.signup-form').removeClass('error');
        $('.error-text').fadeOut();

        if($(this).val() != '') {

            $('.icon-action').removeClass('back');

        } else {

            $('.icon-action').addClass('back');

        }

    });

});