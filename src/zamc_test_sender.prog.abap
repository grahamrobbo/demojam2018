*&---------------------------------------------------------------------*
*& Report ZAMC_TEST1
*&---------------------------------------------------------------------*
*&
*&---------------------------------------------------------------------*
REPORT zamc_test_sender.
PARAMETERS: message TYPE string LOWER CASE DEFAULT `Hi there !`.
DATA: lo_producer TYPE REF TO if_amc_message_producer_pcp.
DATA: lo_pcp_message TYPE REF TO if_ac_message_type_pcp.
DATA: lx_amc_error       TYPE REF TO cx_amc_error.
TRY.
    lo_producer ?=
      cl_amc_channel_manager=>create_message_producer(
        i_application_id = 'YDJ2018'
        i_channel_id = '/pcp'
        ).

    lo_pcp_message = cl_ac_message_type_pcp=>create( ).
*                   CATCH cx_ac_message_type_pcp_error.  "

    lo_pcp_message->set_field(
      EXPORTING
        i_name                       = 'Sender'
        i_value                      = 'Graham Robbo'
    ).
    lo_pcp_message->set_field(
      EXPORTING
        i_name                       = 'Timestamp'
        i_value                      = |{ sy-datum DATE = USER } { sy-uzeit TIME = USER }|
    ).

    lo_pcp_message->set_text( message ).


    lo_producer->send( lo_pcp_message ).

  CATCH cx_amc_error INTO lx_amc_error.
    lo_pcp_message->set_text( lx_amc_error->get_text( ) ).
ENDTRY.
