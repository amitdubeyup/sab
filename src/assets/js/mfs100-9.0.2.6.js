function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}
function getFalseRes()
{
    var res;
    res = { httpStaus: false, err: "Error while calling service" };
    return res;
}
function PostMFSMorfo(url)
    {
    var uri =url+"/capture";
    var XML='<PidOptions ver=\"1.0\">'+'<Opts fCount=\"1\" fType=\"2\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh=\"E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=\" posh=\"\"/>'+'</PidOptions>'
    var res;
    $.support.cors = true;
    var httpStaus = false;
    jqXHR =$.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: uri,
        data:XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (response, request) {
            httpStaus = true;      
            res = { httpStaus: httpStaus, data: response };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
        alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return jqXHR;
}

function PostMFSMorfoTrns(url)
{
    var uri =url+"/capture";
    var XML='<PidOptions ver=\"1.0\">'+'<Opts fCount=\"1\" fType=\"2\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh=\"\" posh=\"\"/>'+'</PidOptions>'
    var res;
    $.support.cors = true;
    var httpStaus = false;
    jqXHR =$.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: uri,
        data:XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (response, request) {
            httpStaus = true;      
            res = { httpStaus: httpStaus, data: response };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
        alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return jqXHR;
}
function discoverAvdm(isType) {
    var SuccessFlag = 0;
    var OldPort = "false";
    var PortNo='';
    var primaryUrl = "https://127.0.0.1:";
    try {
        var protocol = window.location.href;
        if (protocol.indexOf("https") >= 0) {
            primaryUrl = "https://127.0.0.1:";
        }
    }
    catch (e) { }
    url = "";
    for (var i = 11100; i <= 11120; i++) {
        if (primaryUrl == "https://127.0.0.1:" && OldPort == true) {
            i = "8005";
        }
        var verb = "RDSERVICE";
        var err = "";
        SuccessFlag = 0;
        var res;
        $.support.cors = true;
        var httpStaus = false;
        var jsonstr = "";
        var data = new Object();
        var obj = new Object();
        $.ajax({
            type: "RDSERVICE",
            async: false,
            crossDomain: true,
            url: primaryUrl + i.toString(),
            contentType: "text/xml; charset=utf-8",
            processData: false,
            cache: false,
            crossDomain: true,
            success: function (data) {
                httpStaus = true;
                res = { httpStaus: httpStaus, data: data };
                finalUrl = primaryUrl + i.toString();
                var $doc = $.parseXML(data);
                var CmbData1 = $($doc).find('RDService').attr('status');
                var CmbData2 = $($doc).find('RDService').attr('info');
                if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {
                    if ($($doc).find('Interface').eq(0).attr('path') == "/rd/capture") {
                        MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                    }
                    if ($($doc).find('Interface').eq(1).attr('path') == "/rd/capture") {
                        MethodCapture = $($doc).find('Interface').eq(1).attr('path');
                    }
                    if ($($doc).find('Interface').eq(0).attr('path') == "/rd/info") {
                        MethodInfo = $($doc).find('Interface').eq(0).attr('path');
                    }
                    if ($($doc).find('Interface').eq(1).attr('path') == "/rd/info") {
                        MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                    }
                    PortNo=i.toString();
                    SuccessFlag = 1;
                    //alert("RDSERVICE Discover Successfully");
                    return;
                }
            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                if (i == "8005" && OldPort == true) {
                    OldPort = false;
                    i = "11099";
                }
            },
        });

        if (SuccessFlag == 1) {
            break;
        }
    }
    if (SuccessFlag == 0) {
        alert('Connection failed Please try again.Device is not found!!');
    }
    else {
        if(PortNo!='')
        {
            res=deviceInfoAvdm(PortNo,isType);
        }
    }
    return res;
}
function deviceInfoAvdm(portNo,isType) {
            url = "";
            finalUrl = "https://127.0.0.1:" + portNo;
            try {
                var protocol = window.location.href;
                if (protocol.indexOf("https") >= 0) {
                    finalUrl = "https://127.0.0.1:" + portNo;
                }
            }
            catch (e) { }
            var verb = "DEVICEINFO";
            var err = "";
            var res;
            $.support.cors = true;
            var httpStaus = false;
            var jsonstr = "";
            $.ajax({
                type: "DEVICEINFO",
                async: false,
                crossDomain: true,
                url: finalUrl + MethodInfo,
                contentType: "text/xml; charset=utf-8",
                processData: false,
                success: function (data) {
                    httpStaus = true;
                    res = { httpStaus: httpStaus, data: data };
                },
                error: function (jqXHR, ajaxOptions, thrownError) {
                    alert(thrownError);

                    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                },
            });
            var parser, xmlDoc;
            xmlDoc = $.parseXML(res.data);
             if (xmlDoc.getElementsByTagName("additional_info")[0].getElementsByTagName("Param")["0"].attributes.value.value != "") {                                 
                 res= CaptureAvdm(isType);
             }
            else {
                res = { httpStaus: false, data:'Device is not connected.' };
            }
            return res;
        }
        function CaptureAvdm(isType) {       
             if (isType == "4") {
                 var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" posh="UNKNOWN" env="P" /><CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
             }
             else if (isType == "1") {
                 var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /><CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';                
             }
             else if (isType == "5") {//Indo nepal ekyc enrollment capture
                var XML = '<PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2" format="0"   pidVer="2.0" timeout="10000" pTimeout="20000" wadh="TF/lfPuh1n4ZY1xizYpqikIBm+gv65r51MFNek4uwNw=" posh="UNKNOWN" env="P" /></PidOptions>';                
            }
             else {
                 var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /><CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
             }
             var verb = "CAPTURE";
             var err = "";
             var res;
             $.support.cors = true;
             var httpStaus = false;
             var jsonstr = "";
             $.ajax({
                 type: "CAPTURE",
                 async: false,
                 crossDomain: true,
                 url: finalUrl + MethodCapture,
                 data: XML,
                 contentType: "text/xml; charset=utf-8",
                 processData: false,
                 success: function (data) {
                     httpStaus = true;
                     res = { httpStaus: httpStaus, data: data };
                     console.log(data);
                     var $doc = $.parseXML(data);
                     var Message = $($doc).find('Resp').attr('errInfo');
                     if (Message == "Success" || Message=='Success.') {
                        // $("#hdn_CaptureSuccess").val(Message);
                        res = { httpStaus: true, data: data };
                     }
                     else {
                        res = { httpStaus: false, data: Message };
                        // alert(Message);
                     }
                 },
                 error: function (jqXHR, ajaxOptions, thrownError) {
                    if(isType != "5")
                    {
                        alert(thrownError);
                    }                     
                     res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                 },
             });
             return res;
         }
         function discoverAvdmNumber(isType) {
            var SuccessFlag = 0;
            var OldPort = "false";
            var PortNo='';
            var primaryUrl = "https://127.0.0.1:";
            try {
                var protocol = window.location.href;
                if (protocol.indexOf("https") >= 0) {
                    primaryUrl = "https://127.0.0.1:";
                }
            }
            catch (e) { }
            url = "";
            for (var i = 11100; i <= 11120; i++) {
                if (primaryUrl == "https://127.0.0.1:" && OldPort == true) {
                    i = "8005";
                }
                var verb = "RDSERVICE";
                var err = "";
                SuccessFlag = 0;
                var res;
                $.support.cors = true;
                var httpStaus = false;
                var jsonstr = "";
                var data = new Object();
                var obj = new Object();
                $.ajax({
                    type: "RDSERVICE",
                    async: false,
                    crossDomain: true,
                    url: primaryUrl + i.toString(),
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    cache: false,
                    crossDomain: true,
                    success: function (data) {
                        httpStaus = true;
                        res = { httpStaus: httpStaus, data: data };
                        finalUrl = primaryUrl + i.toString();
                        var $doc = $.parseXML(data);
                        var CmbData1 = $($doc).find('RDService').attr('status');
                        var CmbData2 = $($doc).find('RDService').attr('info');
                        if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {
                            if ($($doc).find('Interface').eq(0).attr('path') == "/rd/capture") {
                                MethodCapture = $($doc).find('Interface').eq(0).attr('path');
                            }
                            if ($($doc).find('Interface').eq(1).attr('path') == "/rd/capture") {
                                MethodCapture = $($doc).find('Interface').eq(1).attr('path');
                            }
                            if ($($doc).find('Interface').eq(0).attr('path') == "/rd/info") {
                                MethodInfo = $($doc).find('Interface').eq(0).attr('path');
                            }
                            if ($($doc).find('Interface').eq(1).attr('path') == "/rd/info") {
                                MethodInfo = $($doc).find('Interface').eq(1).attr('path');
                            }
                            PortNo=i.toString();
                            SuccessFlag = 1;
                            //alert("RDSERVICE Discover Successfully");
                            return;
                        }
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        if (i == "8005" && OldPort == true) {
                            OldPort = false;
                            i = "11099";
                        }
                    },
                });
        
                if (SuccessFlag == 1) {
                    break;
                }
            }
            if (SuccessFlag == 0) {                
                alert('Connection failed Please try again.Device is not found!!');
            }
            else {
                if(PortNo!='')
                {
                    res=deviceInfoAvdmInfo(PortNo,isType);
                }
            }
            return res;
        }
        function deviceInfoAvdmInfo(portNo,isType) {
                    url = "";
                    finalUrl = "https://127.0.0.1:" + portNo;
                    try {
                        var protocol = window.location.href;
                        if (protocol.indexOf("http") >= 0) {
                            finalUrl = "https://127.0.0.1:" + portNo;
                        }
                    }
                    catch (e) { }
                    var verb = "DEVICEINFO";
                    var err = "";
                    var res;
                    $.support.cors = true;
                    var httpStaus = false;
                    var jsonstr = "";
                    $.ajax({
                        type: "DEVICEINFO",
                        async: false,
                        crossDomain: true,
                        url: finalUrl + MethodInfo,
                        contentType: "text/xml; charset=utf-8",
                        processData: false,
                        success: function (data) {
                            httpStaus = true;
                            var parser, xmlDoc;
                            xmlDoc = $.parseXML(data);
                             if (xmlDoc.getElementsByTagName("additional_info")[0].getElementsByTagName("Param")["0"].attributes.value.value != "") {
                                res = { httpStaus: httpStaus, data: xmlDoc.getElementsByTagName("additional_info")[0].getElementsByTagName("Param")["0"].attributes.value.value };
                             }
                            else {
                                res = { httpStaus: false, data:'Device is not connected.' };
                            }
                      
                        },
                        error: function (jqXHR, ajaxOptions, thrownError) {
                            alert(thrownError);
        
                            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                        },
                    });
                    return res;
    }
                function MorphoDeviceInfo(url) {
                    var uri =url+"/getDeviceInfo";
                    var res;
                    $.support.cors = true;
                    var httpStaus = false;
                    jqXHR =$.ajax({
                        type: "DEVICEINFO",
                        async: false,
                        crossDomain: true,
                        url: uri,
                        //contentType: "text/xml; charset=utf-8",
                        processData: false,
                        success: function (response) {
                            httpStaus = true;
                            if (response.readyState == 4) {
                                if (response.status == 200) {                           
                                    var parser, xmlDoc;
                                    xmlDoc = $.parseXML(response);                                  
                                    if (response.responseText.getElementsByTagName("additional_info")[0].getElementsByTagName("Param")["0"].attributes.value.value != "") {
                                 
                                    }
                                    else {
                                        alert("Device is not connected.");
                                        
                                     }
                                 }
                                 else {
                                     alert("Device is not connected.");
                                     
                                 }
                             }
                            res = { httpStaus: httpStaus, data: response };
                        },
                        error: function (jqXHR, ajaxOptions, thrownError) {
                        alert(thrownError);
                            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                        },
                    });
                    return jqXHR;
                }

function PostEkycMFSMorfo(url)
                {
                var uri =url+"/capture";
                var XML = '<PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2" format="0"   pidVer="2.0" timeout="10000" pTimeout="20000" wadh="TF/lfPuh1n4ZY1xizYpqikIBm+gv65r51MFNek4uwNw=" posh="UNKNOWN" env="P" /> </PidOptions>';
                var res;
                $.support.cors = true;
                var httpStaus = false;
                jqXHR =$.ajax({
                    type: "CAPTURE",
                    async: false,
                    crossDomain: true,
                    url: uri,
                    data:XML,
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    success: function (response, request) {
                        httpStaus = true;      
                        res = { httpStaus: httpStaus, data: response };
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                    },
                });
                return jqXHR;
            }
            

