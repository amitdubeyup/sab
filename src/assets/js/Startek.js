//Startek connection

function discoverStartek(requestType) {
    var res = null;
    var success = false;

    for (var jk = 0; jk < 5; jk++) {
        if (success == false) {
            var tmpPortNo = (11100 + jk);
            let dt = StartekDeviceInfoFind(tmpPortNo);

            if (dt.readyState == 4) {
                if (dt.status == 200) {
                    var $doc = $.parseXML(dt.responseText);
                    var info = $($doc).find('RDService').attr('info');

                    if (RegExp('\\b' + 'Startek' + '\\b').test(info) == true) {
                        success = true;
                        //alert("RDSERVICE Discover Successfully");
                        return StartekConnect(tmpPortNo, requestType);
                    }
                }
            }
        }
    }

    if (success == false) {
        let dt = StartekDeviceInfoFind(11200);

        if (dt.readyState == 4) {
            if (dt.status == 200) {
                var $doc = $.parseXML(dt.responseText);
                var info = $($doc).find('RDService').attr('info');

                if (RegExp('\\b' + 'Startek' + '\\b').test(info) == true) {
                    //alert("RDSERVICE Discover Successfully");
                    return StartekConnect(tmpPortNo, requestType);
                }
            }
        }
    }

    return res;
}

function StartekConnect(portNo, requestType) {
    if (requestType == "1")//Device info
    {
        return StartekDeviceInfo(portNo);
    }
    else if (requestType == "2")//Capture
    {
        return PostStartek(portNo);
    }
    else if (requestType == "3")//Tranaction Capture
    {
        return PostStartekTrns(portNo);
    }
    else if (requestType == "4")//Indo nepal customer capture
    {
        return PostEkycStartek(portNo);
    }
}

function StartekDeviceInfoFind(port) {
    var uri = 'https://127.0.0.1:' + port + '/?ts=' + Date.now();
    var res;
    $.support.cors = true;
    var httpStaus = false;
    jqXHR = $.ajax({
        type: "RDSERVICE",
        async: false,
        crossDomain: true,
        url: uri,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        cache: false,
        crossDomain: true,
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
            //alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return jqXHR;
}

function StartekDeviceInfo(portNo) {
    var uri = 'https://127.0.0.1:' + portNo + '/rd/Info?ts=' + Date.now();
    var res;
    $.support.cors = true;
    var httpStaus = false;
    jqXHR = $.ajax({
        type: "DEVICEINFO",
        async: false,
        crossDomain: true,
        url: uri,
        processData: false,
        success: function (response) {
            httpStaus = true;
            if (response.readyState == 4) {
                if (response.status == 200) {
                    var xmlDoc;
                    xmlDoc = $.parseXML(response);
                    if (response.responseText.getElementsByTagName("additional_info")[0].getElementsByTagName("Param")["0"].attributes.value.value != "") {
                    }
                    else {
                        alert("Device is not connected.");
                    }
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

function PostStartek(portNo) {
    var uri = 'https://127.0.0.1:' + portNo + '/rd/capture?ts=' + Date.now();
    var XML = '<PidOptions ver="1.0"><Opts wadh="TF/lfPuh1n4ZY1xizYpqikIBm+gv65r51MFNek4uwNw=" fCount=\"1\" fType=\"2\" iCount=\"0\" iType=\"\" pCount=\"0\" pType=\"\" format=\"0\" pgCount="2" pidVer=\"2.0\" timeout=\"10000\" pTimeout="20000" otp=\"\" env="P" posh=\"UNKNOWN\"/></PidOptions>';                                                
                      
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: uri,
        data: XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data.responseText);
            var $doc = $.parseXML(data.responseText);
            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');
            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        complete: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data);
            var $doc = $.parseXML(data.responseText);

            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');

            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });

    return res;
}

function PostEkycStartek(portNo) {
    var uri = 'https://127.0.0.1:' + portNo + '/rd/capture?ts=' + Date.now();
    var XML = '<PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2" format="0"   pidVer="2.0" timeout="10000" pTimeout="20000" wadh="TF/lfPuh1n4ZY1xizYpqikIBm+gv65r51MFNek4uwNw=" posh="UNKNOWN" env="P" /> </PidOptions>';
    
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: uri,
        data: XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data.responseText);
            var $doc = $.parseXML(data.responseText);
            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');
            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        complete: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data);
            var $doc = $.parseXML(data.responseText);

            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');

            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            //alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });

    return res;
}

function PostStartekTrns(portNo) {
    var uri = 'https://127.0.0.1:' + portNo + '/rd/capture?ts=' + Date.now();
    var XML = '<PidOptions ver=\"1.0\"><Opts fCount=\"1\" fType=\"2\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh=\"\" posh=\"\"/></PidOptions>'
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: uri,
        data: XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data.responseText);
            var $doc = $.parseXML(data.responseText);
            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');
            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        complete: function (data) {
            res = { httpStaus: httpStaus, data: data };
            console.log(data);
            var $doc = $.parseXML(data.responseText);

            var errCode = $($doc).find('Resp').attr('errCode');
            var errorInfo = $($doc).find('Resp').attr('errInfo');

            if (errCode == '0') {
                res = { httpStaus: true, data: data };
            }
            else {
                res = { httpStaus: false, data: errorInfo };
            }
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}
