class ZCL_DJ2018_REST_HANDLER definition
  public
  final
  create public .

public section.

  interfaces IF_HTTP_EXTENSION .
protected section.
private section.

  data REQUEST type ref to IF_HTTP_REQUEST .
  data RESPONSE type ref to IF_HTTP_RESPONSE .

  methods GET .
ENDCLASS.



CLASS ZCL_DJ2018_REST_HANDLER IMPLEMENTATION.


  method GET.
    response->set_cdata( |DJ2018 - { sy-datum date = user } { sy-uzeit time = user }| ).
  endmethod.


  METHOD if_http_extension~handle_request.
    request = server->request.
    response = server->response.

* Call handler method (GET, POST, etc)
    DATA(method) = request->get_header_field( '~request_method' ).
    TRY.
        CALL METHOD me->(method).
      CATCH cx_sy_dyn_call_illegal_method.
        server->response->set_status( code = '405' reason = 'NOT IMPLEMENTED' ).
    ENDTRY.
  ENDMETHOD.
ENDCLASS.
