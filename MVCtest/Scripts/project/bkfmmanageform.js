var finalQuestConfirmDate;

var leftarray = new Array("SampleSize", "MainSampleSize", "MainIntervieweeDefine", "AssistIntervieweeDefine", "MainSampleQuota", "AssistSampleSize", "AssistSampleQuota", "IRBOGP");
var rightarray = new Array("MSSampleSize", "MonitorLocAndQua", "CheckingType", "MSMainSampleSize", "MSMainIntervieweeDefine", "MSMainSampleQuota", "MonitorFreqAndTimes", "MonitorTimeRequire", "QuotaDetail", "MysShopperReq");
var UEdit1 = null;
var UEdit2 = null;
var UEdit3 = null;


$(document).ready(function () {
    clearDefault();
    $("input[name='ResourcedemandTemplate']:checked").each(function () {
        var v = $(this).val();
        if (v != '202' && v != '') {
            $("#goh3").show();
            $("#tableGo").show();
        }
        //$("#spanIsInterimTable").hide();
        
        switch (v) {
            case '199':
                $("#divcode").show();
                $("#tableGo tr[name*='b']").show();
                break;
            case '200':
                $("#divDataFormat").show();
                $("#tableGo tr[name*='c']").show();
                break;
            case '213':
                $("#divDataFormat").show();
                $("#tableGo tr[name*='c']").show();
                break;
            case '201':
                $("#divLanguage").show();
                $("#tableGo tr[name*='t']").show();
                $("#divSAN").show();
                
                $("#spanIsInterimTable").show();
                break;
            default:

        }
    });
    $("input[name='ResourcedemandTemplate']").click(function () {

        var check = $(this).is(":checked");
        var v = $(this).val();
        if (check && v != "202") {
            $("#goh3").show();
            $("#tableGo").show();
        }
        var goName = "";
        $("input[name='ResourcedemandTemplate']:checked").each(function () {
            var v1 = $(this).val();
            switch (v1) {
                case '199':
                    goName += "b";
                    break;
                case '200':
                    goName += "c";
                    break;
                case '213':
                    goName += "c";
                    break;
                case '201':
                    goName += "t";
                    break;
                default:

            }
        });
        switch (v) {

            case '199':
                if (check) {
                    $("#divcode").show();

                    $("#tableGo tr[name*='b']").show();
                    $("input[name='ResourcedemandTemplate'][value='202']").attr("checked", false);
                    $("#OEDataDeliverDate").attr("isnull", "0");
                    $("#spanOEDataDeliverDateReq").show();
                } else {
                    $("#divcode").hide();
                    $("#tableGo tr[name*='b']").hide();
                    hideGo();
                    clearCode();
                    $("#OEDataDeliverDate").removeAttr("isnull");
                    $("#spanOEDataDeliverDateReq").hide();
                }



                break;
            case '200':
if ($("#ResourcedemandTemplate_2").prop("checked") != true) {
                if (check) {
                    $("#divDataFormat").show();
                    $("#tableGo tr[name*='c']").show();
                    $("input[name='ResourcedemandTemplate'][value='202']").attr("checked", false);
                    $("#CEDataDeliverDate").attr("isnull", "0");
                    $("#spanCEDataDeliverDateReq").show();
                } else {
                    $("#divDataFormat").hide();
                    $("#tableGo tr[name*='c']").hide();
                    hideGo();
                    clearData();
                    $("#CEDataDeliverDate").removeAttr("isnull");
                    $("#spanCEDataDeliverDateReq").hide();
                }
}
                break;
            case '213':
                if ($("#ResourcedemandTemplate_1").prop("checked") != true) {
                    if (check) {
                        $("#divDataFormat").show();
                        $("#tableGo tr[name*='c']").show();
                        $("input[name='ResourcedemandTemplate'][value='202']").attr("checked", false);
                        $("#CEDataDeliverDate").attr("isnull", "0");
                        $("#spanCEDataDeliverDateReq").show();
                    } else {
                        $("#divDataFormat").hide();
                        $("#tableGo tr[name*='c']").hide();
                        hideGo();
                        clearData();
                        $("#CEDataDeliverDate").removeAttr("isnull");
                        $("#spanCEDataDeliverDateReq").hide();
                    }
                }
                break;
            case '201':
                if (check) {
                    $("#divLanguage").show();
                    $("#tableGo tr[name*='t']").show();
                    $("#divSAN").show();
                    $("input[name='ResourcedemandTemplate'][value='202']").attr("checked", false);
                    $("#TableSpecDate").attr("isnull", "0");
                    $("#CETableDeliver").attr("isnull", "0");
                    $("#OETableDeliver").attr("isnull", "0");
                    $("#spanIsInterimTable").show();
                } else {
                    $("#divLanguage").hide();
                    $("#tableGo tr[name*='t']").hide();
                    $("#divSAN").hide();
                    hideGo();
                    clearTable();
                    $("#TableSpecDate").removeAttr("isnull");
                    $("#CETableDeliver").removeAttr("isnull");
                    $("#OETableDeliver").removeAttr("isnull");
                    $("#spanIsInterimTable").hide();
                }

                break;
            case '202':
                if (check) {
                    $("#divcode").hide();
                    $("#divDataFormat").hide();
                    $("#divLanguage").hide();
                    $("#goh3").hide();
                    $("#tableGo").hide();
                    $("#tableGo tr").hide();
                    $("#divSAN").hide();
                    $("input[name='ResourcedemandTemplate'][value!='202']").attr("checked", false);
                    clearBM();

                }
                break;

        }
        if (goName.indexOf("b") >= 0 || goName.indexOf("c") >= 0 || goName.indexOf("t") >= 0) {
            $("#tableGo tr[name='bct']").show();
        }
        else {
            $("#tableGo tr[name='bct']").hide();
        }
        if (goName.indexOf("b") >= 0 || goName.indexOf("c") >= 0)
            $("#tableGo tr[name='bc']").show();
        else
            $("#tableGo tr[name='bc']").hide();
    });
    $("input[name=ProjectSource]:checked").each(function () {
        if ($(this).attr('id') == 'ProjectSource_1') {
            $("#jofDivision").attr("disabled", "disabled").css("background", "#666");
        }

    });

    //$("input[name=ResultRecordType]").click(function () {
    //    var v = $(this).val();
    //    if (v == "22") {
    //        $("input[name='ArriveDate']").attr("isnull", "0");
    //        $("input[name='Quantity']").attr("isnull", "0");
    //    }
    //    else {
    //        $("input[name='ArriveDate']").removeAttr("isnull");
    //        $("input[name='Quantity']").removeAttr("isnull");
    //    }

    //});


    $("input[name=ProjectSource]").click(function () {
        if ($(this).attr('id') == 'ProjectSource_1') {
            $("#jofDivision").attr("disabled", "disabled").css("background", "#666");
        } else {
            $("#jofDivision").removeAttr("disabled").css("background", "");

        }
    });



    $("#MultiCountry2").click(function () {
        if ($(this).is(":checked")) {
            $("#LanguageOptions").val("");
        }
    });

    $("input[name='radProjectType']").click(function () {
        if ($(this).val() == "6") {
            SetClass($(this).val());
            //$("#Mysteryform").show();
        }
        else {
            SetClass($(this).val());
            //$("#Mysteryform").hide();
        }
    });
    finalQuestConfirmDate = $("#FinalQuestConfirmDate").val();
    $("#pctable tr").each(function (i) {
        var num = parseInt(i) + 1;
        $("td:first", $(this)).text("第" + num + "批：");
    });
    var bkfmStatus = $("#hidBKFMStatus").val();
    if (bkfmStatus == "2") {
        $("#saveorupdate").html("Update");
        $("#txtissue").show();
        $("#btnDraft").hide();
    }
    var resultrecord = document.getElementsByName("ResultRecordType");
    for (var i = 0; i < resultrecord.length; i++) {
        if (resultrecord[i].checked) {
            SetPaper(resultrecord[i]);
        }
    }



    $("#selectResearcher").click(function () {
        openNew("/Account/UserSelect?width=500&type=research", "Select User");
    });
    $("#selectPM").click(function () {
        openNew("/Account/UserSelect?width=500&type=pm", "Select User");
    });
    if ($("#hidProjectSourceID").val() == "") {
        $($("input[name='ProjectSource']")[0]).attr("checked", "checked");
    }
    if ($("#hidSigned").val() == "True") {
        $("#SignedYes").attr("checked", "checked");
    }
    else {
        $("#SignedNo").attr("checked", "checked");
    }
    var strtrue = "<option value=\"yes\">是</option><option value=\"no\">否</option>";
    var strfalse = "<option value=\"no\">否</option><option value=\"yes\">是</option>";
    $("#Weighting").find("option").remove();
    if ($("#hidWeighting").val() == "True") {
        $("#Weighting").append(strtrue)
    }
    else {
        $("#Weighting").append(strfalse)
    }

    $("#NeedCRCrosstabFile").find("option").remove();
    if ($("#hidNeedCRCrosstabFile").val() == "True") {
        $("#NeedCRCrosstabFile").append(strtrue)
    }
    else {
        $("#NeedCRCrosstabFile").append(strfalse)
    }
    //码表选项
    if ($("#HidCodeclassify").val() == "1") {
        $("#Codeclassify").attr("checked", "checked");
    } else {
        $("#Codeclass").attr("checked", "checked");
    }
    //是否有广告牌
    if ($("#hidAdBrand").val() == "1") {
        $("#SigBrandYes").attr("checked", "checked");
    }
    else if ($("#hidAdBrand").val() == "0") {
        $("#SigBrandNo").attr("checked", "checked");
    }

    //是否提供中期编码
    if ($("#hidMiddleCode").val() == "1") {
        $("#RadCodeYes").attr("checked", "checked");
    }
    else {
        $("#RadCodeNo").attr("checked", "checked");
    }

    //是否为需要提供原话
    if ($("#hidProvideTalk").val() == 1) {
        $("#TalkCodeYes").attr("checked", "checked");
    }
    else {
        $("#TalkCodeNo").attr("checked", "checked");
    }
    $("#ResearcherName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/ClientService/GetUserListJson",
                dataType: "json",
                data: {
                    pagesize: "10",
                    searchkey: $("#ResearcherName").val(),
                    filter: "1"
                },
                success: function (data) {
                    response($.map(data.list, function (item) {
                        return {
                            label: item.NickName + ", " + item.TrueName,
                            value: item.NickName + ", " + item.TrueName,
                            Id: item.UserID
                        }
                    }));
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            setResearcherUser(ui.item.Id, ui.item.value);

        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
    $("#PMName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/ClientService/GetUserListJson",
                dataType: "json",
                data: {
                    pagesize: "10",
                    searchkey: $("#PMName").val(),
                    filter: "1"

                },
                success: function (data) {
                    response($.map(data.list, function (item) {
                        return {
                            label: item.NickName + ", " + item.TrueName,
                            value: item.NickName + ", " + item.TrueName,
                            Id: item.UserID
                        }
                    }));
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            setPMUser(ui.item.Id, ui.item.value);

        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

    $("#ResearcherEmail").bind("blur", function () { GetUserNameByEmail("Researcher", $("#ResearcherEmail").val()) });
    $("#PMEmail").bind("blur", function () { GetUserNameByEmail("PM", $("#PMEmail").val()) });

    /***********检查ProjectNumber是否存在**********/
    $("#ProjectNumber").bind("blur", function () {
        checkProjectNumber();
     
        checkProjectNumberFormat();
    });
    /*******提醒语句******/
    $("input.number").limit_number_input();
    if ($("#SampleSize").val() == "") {
        $("#SampleSize").val("此处输入数值,请勿包含文字内容");
    }
    $("#SampleSize").focus(function () {
        if ($("#SampleSize").val() == "此处输入数值,请勿包含文字内容") {
            $("#SampleSize").val("");
        }
    });
    $("#SampleSize").bind("blur", function () {
        if ($("#SampleSize").val() == "") {
            $("#SampleSize").val("此处输入数值,请勿包含文字内容");
        }
    });
    $("#FinalQuestConfirmDate").bind("blur", function (data) {
        if ($(this).val() != "") {
            getFinalQuestConfirmDate($(this).val());
        }
    });
    //$("#FinalQuestConfirmDate").bind("blur", function (data) {
    //    alert($(this).val());
    //    if ($(this).val() != "") {
    //        alert($(this).val());
    //    }
    //});
    ProjectTypeChoose();
    $("input[name='ProjectType']").each(function (i, item) {
        $(item).click(function () {
            ProjectTypeChoose();
        });
    });


    $("input[name='Charting']").click(function () {
        var tt = this;

        if ($(this).val() == "41") {
            $("input[name='Charting']").each(function (i, cbk) {
                if ($(cbk).val() != "41") {
                    cbk.checked = false;
                }
            });
        }
        else {
            $("input[name='Charting']").each(function (i, cbk) {

                if ($(cbk).val() == "41") {
                    cbk.checked = false;
                }
            });
        }
    })

    /*******************Tips显示*******************/
    TipHelp("#BasesAFUTimeLine");
    TipHelp("#EQAEDate");
    TipHelp("#TLEDate");
    TipHelp("#FLEDate");
    TipHelp("#EFTenReceiveDate");
    TipHelp("#CustomerListDate");
    TipHelp("#PilotInterview");
    TipHelp("#ConceptReceiveDate");
    TipHelp("#DPRecieveDataDate");
    TipHelp("#CEDataDeliverDate");
    TipHelp("#OEDataDeliverDate");
    TipHelp("#TableDeliverDate");
    TipHelp("#CETableDeliver");
    TipHelp("#OETableDeliver");
    TipHelp("#GODeliverDateRequire");
    TipHelp("#ProjectFrequency");
    TipHelp("#ProjectCycle");
    TipHelp("#FinalQuestConfirmDate");
    TipHelp("#YVRecruitStartDate");
    TipHelp("#YVRecruitEndDate");
    TipHelp("#SendToDPGDate");
    TipHelp("#PPMDate");
    TipHelp("#EasiToProDate");
    TipHelp("#ESTDate");
    TipHelp("#EBIDate");
   // TipHelp("#SoftLaunchDate");
    TipHelp("#EEIDate");
    TipHelp("#ProgressReportFreq");
    TipHelp("#ChartingCSSpec");
    TipHelp("#ChartingHub");
    TipHelp("#ChartingSubmit");
    TipHelp("#ReportCount");
    TipHelp("#ReportPageCount");
    TipHelp("#USTSpecialRequire");
    TipHelp("#FinalQuestToGo");
    TipHelp("#InitialCodeFrame");
    TipHelp("#TableSpecDate");
    TipHelp("#BPPAnalyse");
    TipHelp("#ChartingConfirm");
    TipHelp("#JOFImageInteractivity");
    TipHelp("#TxtReasonExplain");
    TipHelp("#RioStandardpopulation1");
    TipHelp("#RioStandardpopulation2");
    TipHelp("#OpenEndCount");
    TipHelp('#SpecialQA');
    $("#ProjectNumber").poshytip({
        className: 'tip-skyblue',
        showOn: 'focus',
        alignTo: 'target',
        alignX: 'right',
        alignY: 'bottom',
        offsetX: 15,
        offsetY: -30
    });

    $("#ProjectTypeNote").blur(function () {
        $.ajax({
            url: '/ClientService/SelectProjectTypeNote',
            type: 'POST',
            data: { ProjectTypeNote: $(this).val() },
            success: function (result) {
                if (result.success) {
                    $('#divProjectTypeNote').removeClass("Validform_wrong").addClass("Validform_right").html('');
                } else {
                    $('#divProjectTypeNote').removeClass("Validform_right").addClass("Validform_wrong").html('该项目编号系统中不存在，请确认');

                }
            }
        });

    });

    $("#txtParameteCode").focus(function () {
        if ($("#ProjectTypeNote").val() != "") {
            $('#ParameterTypeStyle').removeClass("Validform_wrong").addClass("Validform_right").html('参考项目编号:' + $("#ProjectTypeNote").val());
        }
    });
    $("#txtParameteCode").keyup(function () {
        if ($("#ProjectTypeNote").val() != "") {
            $('#ParameterTypeStyle').removeClass("Validform_wrong").addClass("Validform_right").html('参考项目编号:' + $("#ProjectTypeNote").val());
            return;
        }
        $.ajax({
            url: '/ClientService/SelectProjectTypeNote',
            type: 'POST',
            data: { ProjectTypeNote: $(this).val() },
            success: function (result) {

                if (result.success) {
                    // $('#ParameterTypeStyle').html("参考项目编号:" + result.resultTitle);
                    $('#ParameterTypeStyle').removeClass("Validform_wrong").addClass("Validform_right");//.html("参考项目编号:" + result.resultTitle);
                } else {

                    $('#ParameterTypeStyle').removeClass("Validform_right").addClass("Validform_wrong").html('该项目编号系统中不存在，请确认');

                }
            }
        });

    });
    /*********************************************/
    setReferenceProjectNameSelected();

    $("input[name='Standardpopulation']").click(function () {
        if ($(this).val() == 0) {
            $("#TxtReasonExplain").removeAttr('disabled').css('background', '').attr("isnull", "0");
            $("#ReasonExplainTip").html('*');
        } else {
            $("#TxtReasonExplain").val('').attr('disabled', 'disabled').removeAttr('isnull').css('background', '#ccc');
            $('#ReasonExplainTip').html('');
        }

    });
    //是否需要中期Table 
    $("input[name='IsInterimTable']").click(function () {
        if ($(this).val() == 1) {
            $('#spTableDeliverDate').html('*');
            $("#TableDeliverDate").removeAttr("disabled").addClass("Wdate").css('background', '');
            

        } else {
            $('#spTableDeliverDate').html('');
            $("#TableDeliverDate").attr('disabled', 'disabled').removeClass("Wdate").removeClass("form input[type=text]").css('background-color', '#ccc').css("width", "90px");
            $("#TableDeliverDate").val("");
        }

    });

    var hidradiovalue = $("#hidradio").val();
    $("input[name=MultiCountry]").each(function () {
        if ($(this).val() == hidradiovalue) {
            $(this).attr("checked", "checked");
        }
    });

    $("input[name='ParameterCodeFormat']").click(function () {
        if ($(this).val() == 0) {
            $('#txtParameteCode').attr('disabled', 'disabled').css("background", "#ccc");
            $('#RdoCodeclassify1').attr('disabled', 'disabled');
            $('#RdoCodeclassify2').attr('disabled', 'disabled');
        } else {
            $('#txtParameteCode').removeAttr("disabled").css("background", "");
            $('#RdoCodeclassify1').removeAttr("disabled");
            $('#RdoCodeclassify2').removeAttr("disabled");
        }

    });
    checkBppsChk();
    setUEditor();
    setOperateType();
    setVerticalRad();
    showCopy();
    //setParameterCodeFormat();
});

function setParameterCodeFormat() {

    var v = $("#txtParameteCode").val();
    var c = $("input[name='RdoCodeclassify']:checked").length > 0;
    if (v != '' || c == true) {
        $("#CodeFormatYes").attr('checked', 'checked');
    } else {

        $("#CodeFormatNo").attr('checked', 'checked');
    }
}
//设置富文本框
function setUEditor() {
    //var toolbar = [['inserttable', 'deletetable']];
    //UEdit1 = UE.getEditor('MainSampleSize', {
    //    toolbars: toolbar,
    //    elementPathEnabled: false
    //});
    //UEdit2 = UE.getEditor('AssistSampleSize', {
    //    toolbars: toolbar,
    //    elementPathEnabled: false
    //});
    //UEdit3 = UE.getEditor('MonitorFreqAndTimes', {
    //    toolbars: toolbar,
    //    elementPathEnabled: false
    //});
    //CKEDITOR.replace('MainSampleSize');
    //UEdit1 = KindEditor.create('#MainSampleSize', { items: ['table'], width: '300px' });
}
function setDPRecieveDataDate() {
    var EEIDate = $('#EEIDate').val();
    if (EEIDate != "") {
        $.get("/ClientService/GetDPRecieveDataDate?date=" + EEIDate, function (data) { $("#DPRecieveDataDate").val(data); })

    }

}
function AddDay(date, add) {
    var t = new Date(date); // 获取今天时间
    t.setDate(t.getDate() + add);

    return t.toLocaleDateString().replace('年', '-').replace('月', '-').replace('日', '');
}
//设置最终CE Table交付日期
function setCETableDeliver() {

    var TableSpecDate = $('#TableSpecDate').val();
    var CEDataDeliverDate = $('#CEDataDeliverDate').val();

    $.get("/ClientService/GetCETableDeliver?TableSpecDate=" + TableSpecDate + "&CEDataDeliverDate=" + CEDataDeliverDate,
        function (data) {
            $("#CETableDeliver").val(data);
        });
}
function setOETableDeliver() {
    //“最终OE table交付日期”= （ “OE数据交付日期” + 1个工作日）或（ “最终CE Table交付日期" ）中的较大值

    //var OEDataDeliverDate = $('#OEDataDeliverDate').val();
    //var CETableDeliver = $('#CETableDeliver').val();
    //$.get("/ClientService/GetOETableDeliver?OEDataDeliverDate=" + OEDataDeliverDate + "&CETableDeliver=" + CETableDeliver,
    //    function (data) {
    //        $("#OETableDeliver").val(data);
    //    });


}

//设置 OperateType选中
function setOperateType() {
    var OperateType = $("#hidOperateType").val();

    var checkRadio = $("input[name='radProjectType'][value=" + OperateType + "]");
    if (checkRadio.length > 0) {
        checkRadio.attr("checked", "checked");
    }
    if (OperateType == "6") {
        $("#Mysteryform").show();
    }

    SetClass(OperateType);

}

function setVerticalRad() {
    var vt = $("#hidVertical").val();

    var checkRadio = $("input[name='radVertical'][value=" + vt + "]");
    if (checkRadio.length > 0) {
        checkRadio.attr("checked", "checked");
    }
   

    SetVertical(vt);

}

function SetVertical(id) {

}


function SetClass(id) {
    if (id == "6") {
        for (var i = 0, n = leftarray.length; i < n; i++) {
            $("#" + leftarray[i]).attr("disabled", "true");
            $("#" + leftarray[i]).css("background", "#999");



            //$("#" + leftarray[i]).val("");
        }
        for (var i = 0, n = rightarray.length; i < n; i++) {
            $("#" + rightarray[i]).removeAttr("disabled");
            $("#" + rightarray[i]).css("background", "White");

        }

        //UEdit1.hide();
        //UEdit2.hide();
        //UEdit3.show();
        //$("#MainSampleSize").show();
        //$("#AssistSampleSize").show();
        //$("#MonitorFreqAndTimes").hide();

        $("#FileMainSampleSize").attr('disabled', 'disabled');
        $("#FileAssistSampleSize").attr('disabled', 'disabled');
        $("#FileMainSampleSize2").removeAttr('disabled');
        $("#FileMonitorFreqAndTimes").removeAttr('disabled');

        $("#MSSampleSize").attr("isnull", "0");
        $("#MSMainSampleSize").attr("isnull", "0");
        $("#MSMainIntervieweeDefine").attr("isnull", "0");
        $("#MSMainSampleQuota").attr("isnull", "0");
        $("#MonitorLocAndQua").attr("isnull", "0");
        $("#CheckingType").attr("isnull", "0");
        $("#MonitorFreqAndTimes").attr("isnull", "0");
        $("#MonitorTimeRequire").attr("isnull", "0");
        $("#QuotaDetail").attr("isnull", "0");
        $("#MysShopperReq").attr("isnull", "0");


        $("#SampleSize").removeAttr("isnull");
        $("#MainSampleSize").removeAttr("isnull");
        $("#MainIntervieweeDefine").removeAttr("isnull");
        $("#MainSampleQuota").removeAttr("isnull");
        $("#AssistSampleSize").removeAttr("isnull");
        $("#AssistIntervieweeDefine").removeAttr("isnull");
        $("#AssistSampleQuota").removeAttr("isnull");
        $("#IRBOGP").removeAttr("isnull");
        $("#SampleSize").removeClass("focus");
        $("#MainSampleSize").removeClass("focus");
        $("#MainIntervieweeDefine").removeClass("focus");
        $("#MainSampleQuota").removeClass("focus");
        $("#AssistSampleSize").removeClass("focus");
        $("#AssistIntervieweeDefine").removeClass("focus");
        $("#AssistSampleQuota").removeClass("focus");
        $("#IRBOGP").removeClass("focus");
    }
    else {
        for (var i = 0, n = rightarray.length; i < n; i++) {
            $("#" + rightarray[i]).attr("disabled", "true");
            $("#" + rightarray[i]).css("background", "#999");
            $("#" + rightarray[i]).val("");
        }
        for (var i = 0, n = leftarray.length; i < n; i++) {
            $("#" + leftarray[i]).removeAttr("disabled");
            $("#" + leftarray[i]).css("background", "White");

        }

        //UEdit1.show();
        //UEdit2.show();
        //UEdit3.hide();
        //$("#MainSampleSize").hide();
        //$("#AssistSampleSize").hide();
        //$("#MonitorFreqAndTimes").show();
        $("#FileMainSampleSize2").attr('disabled', 'disabled');
        $("#FileMonitorFreqAndTimes").attr('disabled', 'disabled');
        $("#FileMainSampleSize").removeAttr('disabled');
        $("#FileAssistSampleSize").removeAttr('disabled');


        $("#SampleSize").attr("isnull", "0");
        $("#MainSampleSize").attr("isnull", "0");
        $("#MainIntervieweeDefine").attr("isnull", "0");
        $("#MainSampleQuota").attr("isnull", "0");
        $("#AssistSampleSize").attr("isnull", "0");
        $("#AssistIntervieweeDefine").attr("isnull", "0");
        $("#AssistSampleQuota").attr("isnull", "0");
        $("#IRBOGP").attr("isnull", "0");


        $("#MSSampleSize").removeAttr("isnull");
        $("#MSMainSampleSize").removeAttr("isnull");
        $("#MSMainIntervieweeDefine").removeAttr("isnull");
        $("#MSMainSampleQuota").removeAttr("isnull");
        $("#MonitorLocAndQua").removeAttr("isnull");
        $("#CheckingType").removeAttr("isnull");
        $("#MonitorFreqAndTimes").removeAttr("isnull");
        $("#MonitorTimeRequire").removeAttr("isnull");
        $("#QuotaDetail").removeAttr("isnull");
        $("#MysShopperReq").removeAttr("isnull");

        $("#MSSampleSize").removeClass("focus");
        $("#MSMainSampleSize").removeClass("focus");
        $("#MSMainIntervieweeDefine").removeClass("focus");
        $("#MSMainSampleQuota").removeClass("focus");
        $("#CheckingType").removeClass("focus");
        $("#MonitorFreqAndTimes").removeClass("focus");
        $("#MonitorTimeRequire").removeClass("focus");
        $("#QuotaDetail").removeClass("focus");
        $("#MysShopperReq").removeClass("focus");

    }
}

function setReferenceProjectNameSelected() {


    var ReferenceProjectNameVal = $("#hidReferenceProjectName").val();
    var chkList = $("input[name='ReferenceProjectName']");
    $("input[name='ReferenceProjectName']").each(function () {
        var val = $(this).val();
        if (ReferenceProjectNameVal.indexOf(val) >= 0) {
            $(this).attr("checked", true);
        }

    });
    var jval = $("#jofStudyTypeForBpps").val();
    if (ReferenceProjectNameVal.indexOf(jval) >= 0) {
        $("#jofStudyTypeForBpps").show();
    } else { $("#jofStudyTypeForBpps").hide(); }
}


function ProjectTypeChoose() {
    if (document.getElementById("ProjectType_0").checked == false) {
        $("#ProjectCycle").removeAttr("disabled");
        $("#ProjectCycle").css("background", "url('../images/bg_input.gif') repeat-x scroll center top #FDFDFD");
        $("#ProjectFrequency").removeAttr("disabled");
        $("#ProjectFrequency").css("background", "url('../images/bg_input.gif') repeat-x scroll center top #FDFDFD");
        $("#ProjectCycle").attr("isnull", "0");
        $("#ProjectFrequency").attr("isnull", "0");
        $(".ptcss").show();
    }
    else {
        $("#ProjectCycle").attr("disabled", true);
        $("#ProjectCycle").val("");
        $("#ProjectCycle").css("background", "none repeat scroll 0 0 #999999");
        $("#ProjectFrequency").attr("disabled", true);
        $("#ProjectFrequency").val("");
        $("#ProjectFrequency").css("background", "none repeat scroll 0 0 #999999");
        $("#ProjectCycle").removeAttr("isnull");
        $("#ProjectFrequency").removeAttr("isnull");
        $(".ptcss").hide();
    }
}
function getFinalQuestConfirmDate(fdate) {
    finalQuestConfirmDate = fdate
}

function checkProjectNumberFormat() {
    //alert($("#ProjectNumber").val() + "," + isNaN($("#ProjectNumber").val()));
    var re = /^[A-Za-z0-9]*$/;
    var ttt = $("#ProjectNumber").val();
    ttt = ttt.replace(" ", "");
    if (!re.test(ttt)) {
        //alert("“项目编号”只能填写字母和数字，不可包括”-“,”#”等特殊符号；如是tracking项目，请保持项目编号一致，并在“项目名称”部分作补充。");
        $("#ProjectNumber").addClass("focus");
        return false;
    }
    else {
        $("#ProjectNumber").removeClass("focus");
        return true;
    }
}

function checkNumberInput(obj) {
    var re = /^[0-9]*$/;
    var ttt = $(obj).val();
    ttt = ttt.replace(" ", "");
    if (!re.test(ttt)) {
        alert("问卷版本数/语言数只能填写数字");
        $(obj).addClass("focus");
        //location.href = "#"+obj.id;
        return false;
    }
    else {
        $(obj).removeClass("focus");
        return true;
    }
    
}

function checkProjectNumber() {
    $.get("/ClientService/CheckProjectNumber", { 'id': $("#hidId").val(), 'projectNumber': escape($("#ProjectNumber").val()) }, function (data) {
        if (data.checkResult == true) {
            $("#ProjectNumber").addClass("focus");
            alert("此项目编号与其他项目编\n号重复，请检查并更改！");
            return false;
        }
        else {
            $("#ProjectNumber").removeClass("focus");
            return true;
        }
    });
}

//Jerry.lu 保存BKFM，并不发送给GO，可以再次编辑
function btnsave() {
    CheckDataDeliverDate();
    if (!checkProjectNumberFormat()) {
        location.href = "#ProjectNumber";
        return false;
    }


    if ($("#QuestVersions").val()!="") {
        var qr = checkNumberInput(document.getElementById("QuestVersions"));
        if (!qr)
            return false;
    }
    if ($("#LanguageCount").val() != "") {
        var qr = checkNumberInput(document.getElementById("LanguageCount"));
        if (!qr)
            return false;
    }
            
    //if ($("#HidResource").val().indexOf('201') != -1) {
    //    if ($("input[name='LanguageType']:checked").size() == 0) {
    //        alert("请选择报告的语言");
    //        location.href = "#LanguageType";
    //        return;
    //    }
    //}
    //if ($("input[name='ParameterCodeFormat']:checked").val() == 1) {
    //    if ($("#txtParameteCode").val() == '') {
    //        alert('请填写供应参码表编号！');
    //        location.href = "#txtParameteCode";
    //        $("#txtParameteCode").addClass("focus");
    //        return;
    //    }
    //    if ($("input[name='RdoCodeclassify']:checked").size() == 0) {
    //        alert('请选择参考码表的使用方式(完全沿用/仅供参考)！');
    //        location.href = "#txtParameteCode";
    //        return;
    //    }
    //}

    //if ($("input[name='IsInterimTable']:checked").val() == 1) {
    //    if ($("#TableDeliverDate").val() == '') {
    //        alert('请填写中期table交付日期！');
    //        location.href = "#TableDeliverDate";
    //        $("#TableDeliverDate").addClass("focus");

    //        return;
    //    }
    //}
    //if ($("input[name='Standardpopulation']:checked").val() == "0") {
    //    if ($("#TxtReasonExplain").val() == "") {
    //         //$("#TxtReasonExplain").attr("isnull", "0");
    //        alert("请填写原因说明！");
    //        location.href = "#TxtReasonExplain";
    //        $("#TxtReasonExplain").addClass("focus");

    //        return false;
    //    }
    //}   

    $.get("/ClientService/CheckProjectNumber", { 'id': $("#hidId").val(), 'projectNumber': escape($("#ProjectNumber").val()) }, function (data) {
        if (data.checkResult == true) {
            $("#ProjectNumber").addClass("focus");
            alert("此项目编号与其他项目编\n号重复，请检查并更改！");
            location.href = "#ProjectNumber";
        }
        else {
            $("#ProjectNumber").removeClass("focus");
            $("#hidBKFMStatus").val("6");
            $("#baseform").submitForm({
                checkInput: false,
                url: "/ClientService/CreateProjectBaseData",
                callback: function (data) {

                    var rangNum = GetRandomNum(1, 6000);
                    $.get("/ClientService/BKFMManagementForm", { 'id': data.ID, 'action': 'modify', 'rnd': rangNum }, function (data) {
                        $("#innerView").html(data);
                    });
                    alert("操作成功！");
                    location.href = "#btnDraft";
                    $('#lstProject').bindTable({
                        url: "/GlobalOperations/GetBKFMJson?rnd=" + rangNum + "&Stype=" + $("#hidStype").val() + "&status=2,6,11,13",
                        pageContainer: "#lstProjectPager",
                        pagesize: 10,
                        pageindex: 1,
                        pageRequest: true
                    });
                    //CompleteCreate();
                },
                before: function () {
                }
            }).submit();
        }
    });
}



function CheckDataDeliverDate() {
    var cedate = $("#CEDataDeliverDate").val();
    var endce = $("#CETableDeliver").val();
    if (cedate && endce) {
        if (endce < cedate && $("#ResourcedemandTemplate_3").prop("checked") == true) {
            alert("“最终CE Table交付日期”不能早于“CE数据交付日期”！");
            return false;
        }
    }
    var oedate = $("#OEDataDeliverDate").val();
    var endoe = $("#OETableDeliver").val();
    if (oedate && endce) {
        if (endoe < oedate && $("#ResourcedemandTemplate_3").prop("checked") == true) {
            alert("“最终OE Table交付日期”不能早于“OE数据交付日期”！");
            return false;
        }
    }
    if ($("#ResourcedemandTemplate_0").prop("checked") == false && $("#ResourcedemandTemplate_3").prop("checked") == true) {
        if ($("#OETableDeliver").val() == "" || $("#CETableDeliver").val() == "") {

        }
        else {
            if ($("#OETableDeliver").val() != $("#CETableDeliver").val()) {
                alert("“最终OE table交付日期”必须等于 “最终CE Table交付日期” ");
                return false;
            }
        }
    }
    else if ($("#ResourcedemandTemplate_0").prop("checked") == true && $("#ResourcedemandTemplate_3").prop("checked") == true) {
        if ($("#OETableDeliver").val() == "" || $("#CETableDeliver").val() == "") {
            //alert("“最终OE table交付日期”必须大于 “最终CE Table交付日期”   ");
            //return false;
        }
        else {
            var a = Date.parse($("#OETableDeliver").val());
            var b = Date.parse($("#CETableDeliver").val());

            if (a <= b) {
                alert("“最终OE table交付日期”必须晚于 “最终CE Table交付日期”   ");
                return false;
            }
        }
    }

    return true;
}

//Jerry.lu 保存并发送BKFM给GO
function btnsend() {

   

    if (!checkProjectNumberFormat()) {
        location.href = "#ProjectNumber";
        return false;
    }


    if ($("input[name='IsInterimTable']:checked").val() == 1) {
        if ($("#TableDeliverDate").val() == '') {
            alert('请填写中期table交付日期！');
            location.href = "#TableDeliverDate";
            $("#TableDeliverDate").addClass("focus");
            return;
        }
    }

    if ($("input[name='Standardpopulation']:checked").val() == "0") {
        if ($("#TxtReasonExplain").val() == "") {
            alert("请填写原因说明！");
            location.href = "#TxtReasonExplain";
            $("#TxtReasonExplain").addClass("focus");
            return false;
        }
    }

   



    if (!CheckDataDeliverDate())
        return;

    if ($("input[name='ProjectSource']:checked").val() == "112") {
        if ($("#jofDivision option:selected").text() == "Select") {
            alert("请选择Division");
            location.href = "#jofDivision";
            return;
        }
    }

    if ($("input[name='ProjectType']:checked").size() == 0) {
        alert("请选择项目类型");
        location.href = "#RioStandardpopulation1";
        return;

    }

    if ($("input[name='DAOfferProvider']:checked").size() == 0) {
        alert("请选择DA报价提供者");
        location.href = "#RioStandardpopulation1";
        return;

    }

    if ($("input[name='SampleSource']:checked").size() == 0) {
        alert("请选择样本来源");
        location.href = "#SampleSource_0";
        return;

    }

    if ($("input[name='IntervieweeSelectionMode']:checked").size() == 0) {
        alert("请选择受访者选取方式");
        location.href = "#RioStandardpopulation1";
        return;

    }


   

    if ($("input[name='ResultRecordType']:checked").size() == 0) {
        alert("请选择访问或观察结果记录方式");
        location.href = "#RioStandardpopulation1";
        return;

    }
    else {
        var resultrecord = document.getElementsByName("ResultRecordType");
        var uresult = true;
        for (var i = 0; i < resultrecord.length; i++) {
            if (resultrecord[i].checked && $(resultrecord[i]).val() == "22") {
                $("input[name=ArriveDate]").each(function (i, item) {
                    var alength = $("input[name=ArriveDate]").length;

                    if (i < alength - 1 || alength - 1 == 0) {
                        if ($(this).val() == "") {
                            alert("请填写到达GO日期");
                            $(this).addClass("focus");
                            uresult = false;
                            return false;
                        }
                    }


                });

                if (!uresult) {
                    location.href = "#pctable";
                    return;
                }
                $("input[name=Quantity]").each(function (i, item) {
                    var alength = $("input[name=Quantity]").length;
                    if (i < alength - 1 || alength - 1 == 0) {
                        if ($(this).val() == "") {
                            alert("请填写该批问卷总样本量");
                            $(this).addClass("focus");
                            uresult = false;
                            return false;
                        }
                    }
                });
                if (!uresult) {
                    location.href = "#pctable";
                    return;
                }
            }
        }
    }


    if ($("input[name='Standardpopulation']:checked").size() == 0) {
        alert("请选择问卷是否采用标准人口背景信息问题");
        location.href = "#RioStandardpopulation1";
        return;
    }

    var goName = "";
    $("input[name='ResourcedemandTemplate']:checked").each(function () {
        var v1 = $(this).val();
        switch (v1) {
            case '199':
                goName += "199;";
                break;
            case '200':
                goName += "200;";
                break;
            case '201':
                goName += "201;";
                break;
            case '213':
                goName += "213;";
                break;
            default:

        }
    });

    if ($("input[name='ResourcedemandTemplate']:checked").val() != "202") {
        if (goName.indexOf('201') != -1) {

            if ($("input[name='LanguageType']:checked").size() == 0) {
                alert("请选择报告的语言");
                location.href = "#HidResource";
                return;
            }


            if ($("input[name='IsInterimTable']:checked").size() == 0) {
                alert("请选择是否需要中期Table");
                location.href = "#spanIsInterimTable";
                return;
            }
        }
        if ($("input[name='ParameterCodeFormat']:checked").val() == 1) {
            if ($("#txtParameteCode").val() == '') {
                alert('请填写供应参码表编号！');
                location.href = "#txtParameteCode";
                $("#txtParameteCode").addClass("focus");
                return;
            }
            if ($("input[name='RdoCodeclassify']:checked").size() == 0) {
                alert('请选择参考码表的使用方式(完全沿用/仅供参考)！');
                location.href = "#txtParameteCode";
                return;
            }
        }

        if ($("input[name='ResourcedemandTemplate']:checked")[0].value == "199") {
            var tpass = false;
            if ($("#OpenEndCount").val() != "" || $("#SemiOpenEndCount").val() != "") {
                if ($("#OpenEndCount").val() != "0" && $("#OpenEndCount").val() != "") {
                    tpass = true;
                }
                else if ($("#SemiOpenEndCount").val() != "0" && $("#SemiOpenEndCount").val() != "") {
                    tpass = true;
                }
            }



            if (!tpass) {
                if ($("#OpenEndCount").val() == "" || $("#OpenEndCount").val() == "0") {
                    location.href = "#OpenEndCount";
                    $("#OpenEndCount").addClass("focus");
                }


                if ($("#SemiOpenEndCount").val() == "" || $("#SemiOpenEndCount").val() == "0") {
                    location.href = "#SemiOpenEndCount";
                    $("#SemiOpenEndCount").addClass("focus");
                }

                alert("凡需编码项目，开放题和半开题数量至少一个不能为’0’，请重新确认");
                return false;
            }

        }



        if ($("#FinalQuestToGo").val() == "") {
            location.href = "#FinalQuestToGo";
            $("#FinalQuestToGo").addClass("focus");
            return false;
        }

        if ($("#ResourcedemandTemplate_0").prop("checked") == false && $("#ResourcedemandTemplate_3").prop("checked") == true) {
            if ($("#OETableDeliver").val() == "" || $("#CETableDeliver").val() == "") {

            }
            else {
                if ($("#OETableDeliver").val() != $("#CETableDeliver").val()) {
                    alert("“最终OE table交付日期”必须等于 “最终CE Table交付日期” ");
                    return false;
                }
            }
        }
        else if ($("#ResourcedemandTemplate_0").prop("checked") == true && $("#ResourcedemandTemplate_3").prop("checked") == true) {
            if ($("#OETableDeliver").val() == "" || $("#CETableDeliver").val() == "") {
                //alert("“最终OE table交付日期”必须大于 “最终CE Table交付日期”   ");
                //return false;
            }
            else {
                var a = Date.parse($("#OETableDeliver").val());
                var b = Date.parse($("#CETableDeliver").val());

                if (a <= b) {
                    alert("“最终OE table交付日期”必须晚于 “最终CE Table交付日期”   ");
                    return false;
                }
            }
        }
    }

    if ($("#QuestVersions").val() != "") {
        var qr = checkNumberInput(document.getElementById("QuestVersions"));
        if (!qr)
            return false;
    }
    if ($("#LanguageCount").val() != "") {
        var qr = checkNumberInput(document.getElementById("LanguageCount"));
        if (!qr)
            return false;
    }

    if (timeCompare("SendToDPGDate", "FinalQuestConfirmDate") == 1) {
        alert("“发送客户确认问卷到DA/Online/GO日期”  不能早于   “项目确认日期”");
        $("#SendToDPGDate").addClass("focus");
        location.href = "#SendToDPGDate";
        return;
    }
    if (timeCompare("FLEDate", "TLEDate") == 1) {
        alert("“最终链接完成日期”不能早于“测试链接完成日期” ");
        $("#FLEDate").addClass("focus");
        location.href = "#FLEDate";
        return;
    }
    if (timeCompare("EEIDate", "EBIDate") == 1) {
        alert("“期望结束访问日期”不能早于 “期望开始访问日期”  ");
        $("#EEIDate").addClass("focus");
        location.href = "#EEIDate";
        return;
    }
    if (timeCompare("EQAEDate", "EEIDate") == 1) {
        alert("“期望QA结束日期”不能早于“期望结束访问日期”");
        $("#EQAEDate").addClass("focus");
        location.href = "#EQAEDate";
        return;
    }
   
    if (timeCompare("EFTenReceiveDate", "EBIDate") == 1) {
        alert("“期望首10份达到日期”不能早于 “期望访问日期”");
        $("#EFTenReceiveDate").addClass("focus");
        location.href = "#EFTenReceiveDate";
        return;
    }
    if (timeCompare("DPRecieveDataDate", "EEIDate") == 1) {
        alert("“最后一批数据提交GO日期”不能早于“期望结束访问日期”");
        $("#DPRecieveDataDate").addClass("focus");
        location.href = "#DPRecieveDataDate";
        return;
    }
    if (timeCompare("CEDataDeliverDate", "TableSpecDate") == 1) {
        alert("“CE数据交付日期”不能早于 “CS提供Table Spec日期”");
        $("#CEDataDeliverDate").addClass("focus");
        location.href = "#CEDataDeliverDate";
        return;
    }

    if (timeCompare("CETableDeliver", "CEDataDeliverDate") == 1) {
        alert("“最终CE Table交付日期”不能早于“CE数据交付日期” ");
        $("#CETableDeliver").addClass("focus");
        //location.href = "#CETableDeliver";
        return;
    }
    if (timeCompare("OETableDeliver", "OEDataDeliverDate") == 1) {
        alert("“最终OE Table交付日期”不能早于   “OE数据交付日期”");
        $("#OETableDeliver").addClass("focus");
        //location.href = "#OETableDeliver";
        return;
    }

    if (timeCompare("SoftLaunchDate", "EBIDate") == 1) {
        alert("“Soft Launch数据检查日期”不能早于   “期望开始访问日期”");
        $("#SoftLaunchDate").addClass("focus");
        //location.href = "#OETableDeliver";
        return;
    }


    

    
    $.get("/ClientService/CheckProjectNumber", { 'id': $("#hidId").val(), 'projectNumber': escape($("#ProjectNumber").val()) }, function (data) {
        if (data.checkResult == true) {
            $("#ProjectNumber").addClass("focus");
            alert("此项目编号与其他项目编\n号重复，请检查并更改！");
            location.href = "#ProjectNumber";
        }
        else {
            $("#ProjectNumber").removeClass("focus");
            $("#hidBKFMStatus").val("2");
            $("#baseform").submitForm({
                checkInput: true,
                url: "/ClientService/CreateProjectBaseData",

                callback: function (data) {
                    if (data.OnlineMessage == "1") {
                        //    alert("This project involves online programming, you need to register the project at the \"Networks Job Outline Form\" site too.");
                        //    window.open("http://survey.acnielsenonline.com/ourweb/networks/onl2155/direct.asp?r=20582", "_blank");
                    } else {
                        alert("操作成功！");
                    }
                    CompleteCreate();
                },
                before: function () {
                    if ($("#ResearcherID").val() == "") {
                        alert("研究员输入有误!");
                        return false;
                    }
                    if ($("#PMID").val() == "") {
                        alert("项目经理输入有误!");
                        return false;
                    }


                }
            }).submit();
        }
    });
}


function btncancel() {
    $("#innerView").html("");
    $("#BKFMCreate").show();
}


function SetPaper(obj) {
    if ($(obj).val() == "22") {
        $("#pici").show();
    }
    else {
        $("#pici").hide();
    }
}
function clearProjectTypeNote(obj) {
    var partr = $(obj).parent().parent();
    $("input[name='ProjectType_note']", $("td:last", $(partr))).val("");
}
function SetCopyBtn() {
    $("#hidBKFMStatus").val("");
    $("#saveorupdate").html("Send");
    $("#btnDraft").show();
}
function CheckResearch() {
    if (!$("#ResearcherName").hasClass("ui-corner-top")) {
        $.get("/ClientService/CheckUserName", { 'usertype': 'Research', 'userid': $("#ResearcherID").val(), 'searchkey': $("#ResearcherName").val(), 'rnd': GetRandomNum(1, 6000) }, function (data) {
            if (data.Result == 1) {
                $("#ResearcherID").val(data.UserID);
                $("#ResearcherEmail").val(data.Mail);
            }
            else if (data.Result == 2) {
                alert(data.Content);
                $("#ResearcherID").val("0");
                $("#ResearcherEmail").val("");
            }
        });
    }
}
function CheckPM() {
    if (!$("#PMName").hasClass("ui-corner-top")) {
        $.get("/ClientService/CheckUserName", { 'usertype': 'PM', 'userid': $("#PMID").val(), 'searchkey': $("#PMName").val(), 'rnd': GetRandomNum(1, 6000) }, function (data) {
            if (data.Result == 1) {
                $("#PMID").val(data.UserID);
                $("#PMEmail").val(data.Mail);
            }
            else if (data.Result == 2) {
                alert(data.Content);
                $("#PMID").val("0");
                $("#PMEmail").val("");
            }
        });
    }
}
/*********************输入项目经理或者研究员,带出其用户信息************************/
function GetUserNameByEmail(UserType, email) {
    if (email != "") {
        $.get("/ClientService/GetUserNameByEmail", { 'Email': email }, function (data) {
            if (data.result == 1) {
                if (UserType == "Researcher") {
                    $("#ResearcherID").val(data.userId);
                    $("#ResearcherName").val(data.userName)
                }
                else if (UserType == "PM") {
                    $("#PMID").val(data.userId);
                    $("#PMName").val(data.userName)
                }
            }
            else {
                alert("未匹配到此邮箱对应的用户！")
                if (UserType == "Researcher") {
                    $("#ResearcherID").val("0");
                    $("#ResearcherName").val("")
                }
                else if (UserType == "PM") {
                    $("#PMID").val("0");
                    $("#PMName").val("")
                }
            }
        });
    }
}

function TipHelp(obj) {
    $(obj).poshytip({
        className: 'tip-skyblue',
        showOn: 'focus',
        alignTo: 'target',
        alignX: 'right',
        alignY: 'center',
        offsetX: 5
    });
}

function TipHelp2(obj) {
    $(obj).poshytip({
        className: 'tip-skyblue',
        showOn: 'blur',
        alignTo: 'target',
        alignX: 'right',
        alignY: 'center',
        offsetX: 5
    });
}

function TipHelp3(obj) {
    $(obj).poshytip({
        className: 'tip-skyblue',
        showOn: 'keydown',
        alignTo: 'target',
        alignX: 'right',
        alignY: 'center',
        offsetX: 5
    });
}


function hideGo() {

    if ($("input[name='ResourcedemandTemplate']:checked").length == 0) {
        $("#goh3").hide();
    }
}


/********************是否为BASES的项目(BPPs选项)*********************/

function checkBppsChk() {
    if (document.getElementById("ReferenceProjectName_0").checked) {
        $("#jofStudyTypeForBpps").show();
    }
    else {
        $("#jofStudyTypeForBpps").hide();
    }
}
//此项目需要编码 
function clearCode() {
    $("#OpenEndCount").val('');
    $("#SemiOpenEndCount").val('');
    $("input[name='StopwatchFormat']").removeAttr('checked');
    $("input[name='ParameterCodeFormat']").removeAttr('checked');
    $("#txtParameteCode").val('');
    $("input[name='RdoCodeclassify']").removeAttr('checked');
    $("input[name='SigBrand']").removeAttr('checked');
    $("#Text1").val('');
    $("input[name='MidCode']").removeAttr('checked');

    $("input[name='TalkCode']").removeAttr('checked');
    $("#FinalQuestToGo").val('');
    $("#InitialCodeFrame").val('');
    $("input[name='IsInterimTable']").removeAttr('checked');
    $("#OEDataDeliverDate").val('');
    $("#GODeliverDateRequire").val('');
}
//此项目需要数据查错 
function clearData() {
    $("input[name='DataFormat']").removeAttr('checked');
    $("input[name='DataFormat_note_77']").val('');
    $("#FinalQuestToGo").val('');
    $("#CEDataDeliverDate").val('');
    $("#OEDataDeliverDate").val('');
    $("#GODeliverDateRequire").val('');
}
//此项目需要出Table
function clearTable() {
    $("input[name='LanguageType']").removeAttr('checked');
    $("input[name='LanguageType_note_74']").val('');
    $("#FinalQuestToGo").val('');
    $("#TableSpecDate").val('');
    $("input[name='IsInterimTable']").removeAttr('checked');
    $("#TableDeliverDate").val('');
    $("#CETableDeliver").val('');
    $("#OETableDeliver").val('');
    $("#TBADeliverDate").val('');
    $("#GODeliverDateRequire").val('');
    $("#TableDeliverDate").val('');
    $("input[name='SpecialAanalysisNeeds']").removeAttr('checked');
    $("input[name='SpecialAanalysisNeeds_note_198']").val('');
}
//都不需要
function clearBM() {

    clearCode();
    clearData();
    clearTable();
}

function delhF(hid) {
    $("#h" + hid).val("0");
    if (hid == "pathFileMainSampleSize") {
        $("#hidFileMainSampleSize").val("");
    }
    else if (hid == "pathFileAssistSampleSize") {
        $("#hidFileAssistSampleSize").val("");
    }
    else if (hid == "pathFileMonitorFreqAndTimes") {
        $("#hidFileMonitorFreqAndTimes").val("");
    }
    $("#s" + hid).remove();
}

function clearDefault() {
    var action = $("#hidAction").val();
    if (action != 'modify') {
        $("input[name='Standardpopulation']").removeAttr('checked');
    }
}

function timeCompareExt(inputName1, inputName2, obj, dstr) {

    var date1;
    var date2;
    var dtOther;
    if (obj.id == inputName1) {
        date1 = new Date(Date.parse(dstr));
        if ($("#" + inputName2).val() == "") {
            return 0;
        }
        else
            date2 = Date.parse($("#" + inputName2).val());
    }
    else if (obj.id == inputName2) {
        date2 = new Date(Date.parse(dstr));
        if ($("#" + inputName1).val() == "") {
            return 0;
        }
        else
            date1 = Date.parse($("#" + inputName1).val());
    }

    if (date1 <date2)
        return 1;//前者小于后者
    else if (date1 > date2)
        return 2;//前者大于后者
    else
        return 3;//等于
}

function formatWe(obj, dstr) {
    if (isweekEnd(dstr)) {
        $(obj).addClass("focus");
    }
    else {
        $(obj).removeClass("focus");
    }

    if (obj.id == "SendToDPGDate" || obj.id == "FinalQuestConfirmDate") {
        if (timeCompareExt("SendToDPGDate", "FinalQuestConfirmDate",obj, dstr) == 1) {
            alert("“发送客户确认问卷到DA/Online/GO日期”  不能早于   “项目确认日期”");
            $("#SendToDPGDate").addClass("focus");
           // location.href = "#SendToDPGDate";
            return;
        }
    }
    if (obj.id == "FLEDate" || obj.id == "TLEDate") {

        if (timeCompareExt("FLEDate", "TLEDate", obj, dstr) == 1) {
            alert("“最终链接完成日期”不能早于“测试链接完成日期” ");
            $("#FLEDate").addClass("focus");
           // location.href = "#FLEDate";
            return;
        }
    }
    if (obj.id == "EEIDate" || obj.id == "EBIDate") {
        if (timeCompareExt("EEIDate", "EBIDate", obj, dstr) == 1) {
            alert("“期望结束访问日期”不能早于 “期望开始访问日期”  ");
            $("#EEIDate").addClass("focus");
            //location.href = "#EEIDate";
            return;
        }
    }
    if (obj.id == "EQAEDate" || obj.id == "EEIDate") {

        if (timeCompareExt("EQAEDate", "EEIDate", obj, dstr) == 1) {
            alert("“期望QA结束日期”不能早于“期望结束访问日期”");
            $("#EQAEDate").addClass("focus");
           // location.href = "#EQAEDate";
            return;
        }
    }
   
    if (obj.id == "EFTenReceiveDate" || obj.id == "EBIDate") {

        if (timeCompareExt("EFTenReceiveDate", "EBIDate", obj, dstr) == 1) {
            alert("“期望首10份达到日期”不能早于 “期望访问日期”");
            $("#EFTenReceiveDate").addClass("focus");
            location.href = "#EFTenReceiveDate";
            return;
        }
    }
    if (obj.id == "DPRecieveDataDate" || obj.id == "EEIDate") {
        if (timeCompareExt("DPRecieveDataDate", "EEIDate", obj, dstr) == 1) {
            alert("“最后一批数据提交GO日期”不能早于“期望结束访问日期”");
            $("#DPRecieveDataDate").addClass("focus");
            location.href = "#DPRecieveDataDate";
            return;
        }
    }
    if (obj.id == "CEDataDeliverDate" || obj.id == "TableSpecDate") {
        if (timeCompareExt("CEDataDeliverDate", "TableSpecDate", obj, dstr) == 1) {
            alert("“CE数据交付日期”不能早于 “CS提供Table Spec日期”");
            $("#CEDataDeliverDate").addClass("focus");
           // location.href = "#CEDataDeliverDate";
            return;
        }
    }
    if (obj.id == "CETableDeliver" || obj.id == "CEDataDeliverDate") {

        if (timeCompareExt("CETableDeliver", "CEDataDeliverDate", obj, dstr) == 1) {
            alert("“最终CE Table交付日期”不能早于“CE数据交付日期” ");
            $("#CETableDeliver").addClass("focus");
            //location.href = "#CETableDeliver";
            return;
        }
    }
    if (obj.id == "OETableDeliver" || obj.id == "OEDataDeliverDate") {

        if (timeCompareExt("OETableDeliver", "OEDataDeliverDate", obj, dstr) == 1) {
            alert("“最终OE Table交付日期”不能早于   “OE数据交付日期”");
            $("#OETableDeliver").addClass("focus");
            //location.href = "#OETableDeliver";
            return;
        }
    }


    if (obj.id == "SoftLaunchDate" || obj.id == "EBIDate") {

        if (timeCompareExt("SoftLaunchDate", "EBIDate", obj, dstr) == 1) {
            alert("“Soft Launch数据检查日期”不能早于   “期望开始访问日期”");
            $("#OETableDeliver").addClass("focus");
            //location.href = "#OETableDeliver";
            return;
        }
    }


}





