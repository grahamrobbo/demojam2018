class YCL_APC_WSP_EXT_YDEMOJAM_2018 definition
  public
  inheriting from CL_APC_WSP_EXT_STATELESS_PCP_B
  final
  create public .

public section.

  methods IF_APC_WSP_EXT_PCP~ON_MESSAGE
    redefinition .
  methods IF_APC_WSP_EXT_PCP~ON_START
    redefinition .
protected section.
private section.

  methods CHECK_APPLICATION
    importing
      !I_TEXT type STRING .
  methods PREPARE_MESSAGE_FOR_UI
    importing
      !I_MESSAGE_TEXT type STRING
    returning
      value(RESULT) type STRING .
  methods SEND_ERROR_MESSAGE
    importing
      !I_MESSAGE_MANAGER type ref to IF_APC_WSP_MESSAGE_MANAGER_PCP
      !I_ERROR_OBJECT type ref to CX_ROOT .
ENDCLASS.



CLASS YCL_APC_WSP_EXT_YDEMOJAM_2018 IMPLEMENTATION.


  METHOD check_application.

*    DATA lo_app_error TYPE REF TO cx_abap_channels_error.
*
*    IF i_text = 'error'.
*      CREATE OBJECT lo_appl_error.
*      RAISE EXCEPTION lo_appl_error.
*    ENDIF.

  ENDMETHOD.


  METHOD if_apc_wsp_ext_pcp~on_message.
    TRY.

        DATA(lv_text_str) = i_message->get_text( ).

        check_application( lv_text_str ).

        lv_text_str = prepare_message_for_ui( lv_text_str ).

        i_message->set_text( lv_text_str ).
        i_message_manager->send( i_message ).

      CATCH cx_ac_message_type_pcp_error INTO DATA(lo_pcp_error).
        send_error_message( i_message_manager = i_message_manager i_error_object = lo_pcp_error ).
      CATCH cx_apc_error INTO DATA(lo_apc_error).
        send_error_message( i_message_manager = i_message_manager i_error_object = lo_apc_error ).
      CATCH cx_root INTO DATA(lo_appl_error).
        send_error_message( i_message_manager = i_message_manager i_error_object = lo_appl_error ).
    ENDTRY.
  ENDMETHOD.


  method IF_APC_WSP_EXT_PCP~ON_START.
*SUPER->IF_APC_WSP_EXT_PCP~ON_START(
*    I_CONTEXT         = I_CONTEXT
*    I_MESSAGE_MANAGER = I_MESSAGE_MANAGER
*       ).
  endmethod.


  METHOD prepare_message_for_ui.
    TYPES: BEGIN OF abapchannels_demo_struc,
             date   TYPE timestamp,
             author TYPE uname,
             text   TYPE string,
           END OF abapchannels_demo_struc.
    DATA: ls_message TYPE abapchannels_demo_struc.

    ls_message-text = i_message_text.

    ls_message-author = sy-uname.
    GET TIME STAMP FIELD ls_message-date.

*    DATA(json_writer) = cl_sxml_string_writer=>create( type = if_sxml=>co_xt_json ).
*
*    CALL TRANSFORMATION abap_channels_demo
*    SOURCE para = ls_message
*    RESULT XML json_writer.
*
*    result = cl_abap_codepage=>convert_from( source = json_writer->get_output( ) ).

    result = /ui2/cl_json=>serialize(
      data = ls_message
      "compress = abap_true
      ts_as_iso8601 = abap_true
      pretty_name = /ui2/cl_json=>pretty_mode-camel_case
    ).

  ENDMETHOD.


  METHOD send_error_message.
    TRY.
        DATA(lo_message) = i_message_manager->create_message( ).
        lo_message->set_field( i_name = 'errorText' i_value = i_error_object->get_text( ) ).
        i_message_manager->send( lo_message ).
      CATCH cx_apc_error INTO DATA(lo_apc_error).
        MESSAGE lo_apc_error->get_text( ) TYPE 'E'.
      CATCH cx_ac_message_type_pcp_error INTO DATA(lo_pcp_error).
        MESSAGE lo_pcp_error->get_text( ) TYPE 'E'.
    ENDTRY.
  ENDMETHOD.
ENDCLASS.
