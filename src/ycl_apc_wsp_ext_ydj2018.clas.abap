class YCL_APC_WSP_EXT_YDJ2018 definition
  public
  inheriting from CL_APC_WSP_EXT_STATELESS_PCP_B
  final
  create public .

public section.

  methods IF_APC_WSP_EXT_PCP~ON_START
    redefinition .
  methods IF_APC_WSP_EXT_PCP~ON_MESSAGE "efwkjfrkjwehr
    redefinition .
protected section.
private section.
ENDCLASS.



CLASS YCL_APC_WSP_EXT_YDJ2018 IMPLEMENTATION.


  METHOD if_apc_wsp_ext_pcp~on_message.

    DATA: lo_producer    TYPE REF TO if_amc_message_producer_pcp,
          pcp_fields     TYPE pcp_fields,
          lo_pcp_message TYPE REF TO if_ac_message_type_pcp.

    TRY.
        DATA(message) = i_message->get_text( ).
        i_message->get_fields(
          CHANGING
            c_fields = pcp_fields
        ).

        lo_pcp_message = cl_ac_message_type_pcp=>create( ).

        lo_pcp_message->set_text( message ).

        TRY.
            LOOP AT pcp_fields REFERENCE INTO DATA(pcp_field).
              lo_pcp_message->set_field(
                EXPORTING
                  i_name  = |Inbound field { pcp_field->name }|
                  i_value = pcp_field->value
              ).
            ENDLOOP.
          CATCH cx_root INTO DATA(cx1).
            DATA(msg) = cx1->get_text( ).
            lo_pcp_message->set_text( msg ).
        ENDTRY.
        lo_pcp_message->set_field(
          EXPORTING
            i_name  = 'Timestamp'
            i_value = |{ sy-datum DATE = USER } { sy-uzeit TIME = USER }|
        ).


        lo_producer ?= cl_amc_channel_manager=>create_message_producer(
                      i_application_id       = 'YDJ2018'
                      i_channel_id           = '/pcp'
                  ).

        lo_producer->send( lo_pcp_message ).
      CATCH cx_amc_error cx_ac_message_type_pcp_error INTO DATA(cx).
        msg = cx->get_text( ).
        MESSAGE cx->get_text( ) TYPE 'E'.
    ENDTRY.

  ENDMETHOD.


  METHOD if_apc_wsp_ext_pcp~on_start.

    TRY.
        DATA(lo_binding) = i_context->get_binding_manager( ).
        lo_binding->bind_amc_message_consumer(
          i_application_id = 'YDJ2018'
          i_channel_id      = '/pcp' ).

      CATCH cx_apc_error INTO DATA(lx_apc_error).
        DATA(lv_message) = lx_apc_error->get_text( ).
        MESSAGE lx_apc_error->get_text( ) TYPE 'E'.
    ENDTRY.

  ENDMETHOD.
ENDCLASS.
