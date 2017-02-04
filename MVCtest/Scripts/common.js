var request = {
    QueryString: function (name, url) {
        url = url || location.href;
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)", "i");
        var m = url.match(r);
        return (!m ? "" : m[2]);
    },
    Form: function (name) {
        return $(name).val();
    },
    Url: function () {
        return location.href;
    },
    Path: function () {
        return location.pathname;
    }
};

//打开一个新ajax窗口
function openNew(url, title, loadcallback) {
    var width = request.QueryString("width", url);
    var height = request.QueryString("height", url);
    var dragable = request.QueryString("dragable", url);
    var args = {};
    url && (args.url = url);
    height && (args.height = height);
    width && (args.width = width);
    title && (args.title = title);
    loadcallback && (args.loadcallback = loadcallback);
    dragable && (args.draggable = dragable);
    $.ajaxwin(args);
}

function removeWindow(callBackData) {
    closeWrappedDialog(this);
    alert(this);
    showSelects();
}
function showSelects() {
    //如果是Ie6 显示所有<select>
    if (window.navigator.appVersion.indexOf("MSIE 6") > 0) {
        $(".coverFrame").remove();
    }
}


function selectAll(obj, name) {
    var result = obj.checked ? true : false;
    $("input:checkbox[name='" + name + "']").each(function (i, item) {
        item.checked = result;
    });
}


var ajaxMsg = function (msg) {
    if (msg != undefined) {
        //提示框的属性
        this.result = msg.result || 0; //0错误 1正确 2提示 3警告
        this.title = msg.title || ""; //提示框的标题
        this.redirect = msg.redirect;
        this.content = msg.content || ""; //窗口的内容 通过后台json数据获得
        this.callBackData = msg.callBackData;
    }
}

//获取所有Checkbox选中的值
function getSelectedValue(id, name) {
    name = name || "cId";
    if (id == undefined)
        id = ".list";
    else
        id = "#" + id + " ";
    var checked = $(id + "input[name='" + name + "']:checked");
    if (checked.length == 0) {
        return false;
    }
    else {
        var idlist = "";

        $(checked).each(function () {
            if (this.checked)
                idlist += "," + $(this).val();
        });
        if (idlist != "")
            idlist = idlist.substring(1);
    }
    return idlist;
}


//获取所有Checkbox选中的文字
function getSelectedText(id, name) {
    name = name || "cId";
    if (id == undefined)
        id = ".list";
    else
        id = "#" + id + " ";
    var checked = $(id + "input[name='" + name + "']:checked");
    if (checked.length == 0) {
        return false;
    }
    else {
        var idlist = "";

        $(checked).each(function () {
            if (this.checked)
                idlist += "," + $(this).val();
        });
        if (idlist != "")
            idlist = idlist.substring(1);
    }
    return idlist;
}

//保留2位小数
function changeTwoDecimal(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        console && console.log('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;

    return f_x;
}
//是否双休日
function isweekEnd(dateStr) {
    var day = parseISO8601(dateStr);
    if (day.getDay() == 0 || day.getDay() == 6) {
        return true;
    }
    else
        return false;
}


function parseISO8601(dateStringInRange) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
    date = new Date(NaN), month,
  parts = isoExp.exec(dateStringInRange);

    if (parts) {
        month = +parts[2];
        date.setFullYear(parts[1], month - 1, parts[3]);
        if (month != date.getMonth() + 1) {
            date.setTime(NaN);
        }
    }
    return date;
}





String.prototype.trim = function (chr) {
    chr = chr || " ";
    this.replace(new RegExp(chr, "ig"), "");
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
}  


function isTypeNum(e) {
    try {
        var evt = e ? e : window.event;
        var char = String.fromCharCode(evt.which ? evt.which : evt.keyCode);
        //alert(char);
        var re = /[0-9.]/g;
        var isNumber = char.match(re) != null ? true : false;
        if (window.event) {
            evt.returnValue = isNumber;
        } else if (!isNumber) {
            evt.preventDefault();
        }
    } catch (e) {

    }

}

String.prototype.gblen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}


function jsonToString(obj) {
    switch (typeof (obj)) {
        case 'string':
            return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
        case 'array':
            return '[' + obj.map(jsonToString).join(',') + ']';
        case 'object':
            if (obj instanceof Array) {
                var strArr = [];
                var len = obj.length;
                for (var i = 0; i < len; i++) {
                    strArr.push(jsonToString(obj[i]));
                }
                return '[' + strArr.join(',') + ']';
            } else if (obj == null) {
                return 'null';

            } else {
                var string = [];
                for (var property in obj) string.push(jsonToString(property) + ':' + jsonToString(obj[property]));
                return '{' + string.join(',') + '}';
            }
        case 'number':
            return obj;
        case false:
            return obj;
    }
}


//得到url中的参数值
function getQry(curUrl, key) {
    var firstParaIndex = curUrl.toString().indexOf("?");
    var paraStr = "";
    if (firstParaIndex >= 0) {
        paraStr = curUrl.toString().substring(firstParaIndex + 1);
    }
    var arr = paraStr.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            return ar[1];
        }
    }
    return '';
}


function clearFile(formId, controId) {
    var file = document.getElementById(controId);
    var form = document.createElement(formId);
    document.body.appendChild(form);
    //记住file在旧表单中的的位置
    var pos = file.nextSibling;
    form.appendChild(file);
    form.reset();
    pos.parentNode.insertBefore(file, pos);
    document.body.removeChild(form);
}

function upRow(id) {
    id = "#item_" + id;

    if ($("tr", $(id).parent()).length == 1)
        return;

    $(id).prev().before($(id));
}
function downRow(id) {
    id = "#item_" + id;

    if ($("tr", $(id).parent()).length == 1)
        return;

    $(id).next().after($(id));
}


function checkMaxLength(target) {
    var errorMsg = "";
    $("[maxlength][iname]", target).each(function () {
        var length = parseInt($(this).attr("maxlength"))
        var name = $(this).attr("iname");
        if (length < this.value.length) {
            errorMsg += name + "的长度不能超过" + length + "个字符\n";
        }
    });
    if (errorMsg.length > 0) {
        alert(errorMsg);
        return false;
    } else {
        return true;
    }
}


function copyURL() {
    var txt = window.location.href;
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
        alert("复制成功！")
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
        alert("复制成功！")
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("复制成功！")
    }
}

function refresh() {
    if (confirm("确定要重新载入数据吗？"))
        document.location.reload();
}

$.fn.extend({
    limit_number_input: function (t) {
        var type = t || "float";
        this.bind("keydown", function (e) {
            var key = window.event ? e.keyCode : e.which;
            if (type == "float" && isFullStop(key)) {
                return $(this).val().indexOf('.') < 0;
            }
            return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
        });
        return this;
    },
    limitThousandthNumberInput: function (t, n) {
        var type = t || "float";
        this.bind("keydown", function (e) {
            var key = window.event ? e.keyCode : e.which;
            if (type == "float" && isFullStop(key)) {
                return $(this).val().indexOf('.') < 0;
            }
            return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
        }).bind("keyup", function () {
            checkNumber(this);
            cutFloat(n, this);
        }).bind("blur", function () {
            checkNumber(this);
            cutFloat(n, this);
        });
        function cutFloat(nm, obj) {
            var num = parseInt(nm);
            if (!isNaN(num)) {
                var reg = new RegExp("\\.\\w{" + num + "}");
                var f = reg.exec(obj.value)
                if (f)
                    obj.value = obj.value.replace(/\..+/, f)
            }
        }
        return this;
    }
})
function isNumber(key) {
    return (key >= 48 && key <= 57) || ((key > 95) && (key < 106))
}

function isSpecialKey(key) {
    //8:backspace; 46:delete; 37-40:arrows; 36:home; 35:end; 9:tab; 13:enter   
    return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13
}

function isFullStop(key) {
    return key == 190 || key == 110;
}



$.fn.extend({
    FormatNumber: function () {
        _this = this;
        var number = _this.val();
        _this.val(addCommas(_this.val()));
        var oldOnkeypress, oldOnkeyup, oldOnbur;
        _this.bind("keyup", function () {
            _this.val(addCommas(_this.val()));
        });
        _this.bind("keypress", function (e) {
            try {
                var evt = e ? e : window.event;
                var char = String.fromCharCode(evt.which ? evt.which : evt.keyCode);
                var re = /[0-9.]/g;
                var isNumber = char.match(re) != null ? true : false;
                if (window.event) {
                    evt.returnValue = isNumber;
                } else if (!isNumber) {
                    evt.preventDefault();
                }
            } catch (e) {
            }
        });

        _this.bind("blur", function () {
            _this.val(addCommas(_this.val()));
        });
    }
});

function checkNumber(a) {
    a.number = a.value + "";
    while (a.number.indexOf(",") != -1) {
        a.number = a.number.replace(",", "");
    }
    a.value = addCommas(a.number)
}
function addCommas(nStr) {
    nStr += '';
    while (nStr.indexOf(",") != -1) {
        nStr = nStr.replace(",", "");
    }
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;

}
function remCommas(nStr) {
    while (nStr.indexOf(",") != -1) {
        nStr = nStr.replace(',', '');
    }
    return nStr;
}



function ValidateExpression(ele) {
    if (ele.className.indexOf("phone") != -1) {
        var exp = /^[0-9|-]*$/;

        if (!exp.test(ele.value)) {
            alert("电话号码输入错误");
            ele.value = "";
            return false;
        }
        return;
    }

    if (ele.className.indexOf("email") != -1) {
        if (!validateEmail(ele)) {
            alert("Email格式填写错误");
            ele.value = "";
            ele.focus();
            return false;
        }

        return;
    }
}

//验证EMAIL
function validateEmail(obj) {
    var str = obj.value;
    if (!checkByteLength(str, 1, 50)) return 1;
    var patn = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
    if (!patn.test(str)) {
        return false;//incorrect format
    }
    return true;

}
function checkByteLength(str, minlen, maxlen) {
    if (str == null) return false;
    var l = str.length;
    var blen = 0;
    for (i = 0; i < l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen++;
        }
        blen++;
    }
    if (blen > maxlen || blen < minlen) {
        return false;
    }
    return true;
}

function sortBy(key, orderby) {
    var location = window.location.href;
    location = location.replace(/&?field=\w+/, "");
    location = location.replace(/&orderby=\w+/, "");
    if (location.charAt(location.length - 1) == "?") {
        location = location.replace("?", "");
    }
    location = location.replace("?&", "?");
    window.location.href = location + (location.indexOf("?") > 0 ? "&" : "?") + "field=" + key + "&orderby=" + orderby;
}

function generateLangTab(phId) {
    $("#tab_" + phId + " a").click(function () {
        $("#tab_body_" + phId + " .tab_form").hide();
        $("#tab_" + phId + " li").removeClass("on");
        $("#" + this.id.replace("lang", "form")).show();
        $(this.parentNode).addClass("on");

    });
}

//Json\/Date(1277891379000)\/  转化为正常 
function renderTime(data) {
    var da = eval('new ' + data.replace('/', '', 'g').replace('/', '', 'g'));
    var curMonth = da.getMonth() + 1;
    return da.getFullYear() + "-" + curMonth + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
}

//Json\/Date(1277891379000)\/  转化为正常 
function renderDate(data) {
    var da = eval('new ' + data.replace('/', '', 'g').replace('/', '', 'g'));
    var curMonth = da.getMonth() + 1;
    return da.getFullYear() + "-" + curMonth + "-" + da.getDate();
}

function deleteUpload(obj) {
    if (confirm("确认删除？")) {
        $("input:hidden", $(obj).parent().parent()).val("delete");
        $(obj.parentNode).html("");
    }
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function Return() {
    history.go(-1);
}

String.prototype.trim = function () {
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function deleteDialog(id, model, text,op,tblid,comurl) {
    openNew("/form/DeleteDialog?width=400&model=" + model + "&id=" + id + "&text=" + escape(text) + "&op=" + op + "&_tblid=" + tblid + "&comurl=" + escape(comurl), text);
}

function deleteData(id, url, text) {
    if (confirm(text)) {
        $.post(url, { hidId: id, action: "delete" },
            function (data) {
                alert(data.Content);
                if (data.Result == 1)
                    location.href = data.Redirect;
            }
        );
    }
}

function openSelectData(inpuId, width, openType) {
    var openUrl = "";
    var openText = "";
    if (parseInt(openType) == 1) {
        openUrl = "/account/userSelectDialog";
        openText = "选择用户";
    }
    else if (parseInt(openType) == 2) {
        openUrl = "/supplier/supplierSelect?tab=104";
        openText = "选择供应商";
    }
    else if (parseInt(openType) == 3) {
        openUrl = "/implement/projectSelect";
        openText = "选择项目";
    }
    else if (parseInt(openType) == 4) {
        openUrl = "/contact/contactSelect?type=1";
        openText = "选择联系人";
    }
    else if (parseInt(openType) == 5) {
        openUrl = "/system/DepartmentSelect";
        openText = "选择部门";
    }
    else if (parseInt(openType) == 18) {
        openUrl = "/selectData/ActionSelect";
        openText = "选择动作";
    }
    var rangNum = GetRandomNum(1, 6000);
    var pattern = $("#hid" + inpuId + "_pattern").val();//选择方式

    openNew(openUrl + (openUrl.indexOf("?") > 0 ? "&" : "?") + "width=" + width + "&rnd=" + rangNum + "&inputid=" + inpuId + "&_tbl_pattern=" + pattern, openText);
}

function openSelectDataWithModel(inpuId, width,model,filter,title) {
    var rangNum = GetRandomNum(1, 6000);
    var pattern = $("#hid" + inpuId + "_pattern").val();//选择方式
    var openUrl = "/selectData/" + model.replace("Info","") + "Select";
    openNew(openUrl + (openUrl.indexOf("?") > 0 ? "&" : "?") + "width=" + width + "&rnd=" + rangNum + "&inputid=" + inpuId + "&_tbl_pattern=" + pattern + "&filer=" + filter, title);
}

function openSelectDataWithCategory(inpuId, width, openType, category) {
    var openUrl = "";
    var openText = "";
    if (parseInt(openType) == 1) {
        openUrl = "/account/userSelectDialog";
        openText = "选择用户";
    }
    else if (parseInt(openType) == 2) {
        openUrl = "/supplier/supplierSelect?tab=104";
        openText = "选择供应商";
    }
    else if (parseInt(openType) == 3) {
        openUrl = "/implement/projectSelect";
        openText = "选择项目";
    }
    else if (parseInt(openType) == 4) {
        openUrl = "/contact/contactSelect?type=1";
        openText = "选择联系人";
    }
    var rangNum = GetRandomNum(1, 6000);
    openNew(openUrl + (openUrl.indexOf("?") > 0 ? "&" : "?") + "width=" + width + "&rnd=" + rangNum + "&inputid=" + inpuId + "&seachcategory=" + category, openText);
}
function openSelectDataWithType(inpuId, width, openType, type) {
    var openUrl = "";
    var openText = "";
    if (parseInt(openType) == 1) {
        openUrl = "/account/userSelectDialog";
        openText = "选择用户";
    }
    else if (parseInt(openType) == 2) {
        openUrl = "/supplier/supplierSelect?tab=104";
        openText = "选择供应商";
    }
    else if (parseInt(openType) == 3) {
        openUrl = "/implement/projectSelect";
        openText = "选择项目";
    }
    else if (parseInt(openType) == 4) {
        openUrl = "/contact/contactSelect?type=1";
        openText = "选择联系人";
    }
    var rangNum = GetRandomNum(1, 6000);
    openNew(openUrl + (openUrl.indexOf("?") > 0 ? "&" : "?") + "width=" + width + "&rnd=" + rangNum + "&inputid=" + inpuId + "&searchtype=" + type, openText);
}
function deleteSelectData(inpuId) {
    if (confirm("确定删除吗？"))
        $("#t_" + inpuId).remove();
}

function deleteHolderFile(groupId, itemId, seq) {
    if (confirm("确定删除吗？")) {
        $("#spandoc_" + groupId + "_" + itemId + "_" + seq).hide();
        $("#spanfile_" + groupId + "_" + itemId + "_" + seq).show();
        $("#spanright_" + groupId + "_" + itemId + "_" + seq).html("");
        $("#fuh_" + groupId + "_hidItemValue_" + itemId + "_" + seq).val("");
    }
}

function newVerisonHolderFile(groupId, itemId, seq) {
    $("#spandoc_" + groupId + "_" + itemId + "_" + seq).hide();
    $("#spanfile_" + groupId + "_" + itemId + "_" + seq).show();
    $("#spanright_" + groupId + "_" + itemId + "_" + seq).html("<a href=\"javascript:cancelHolderFile('" + groupId + "','" + itemId + "','" + seq + "','" + $("#fuh_" + groupId + "_hidItemValue_" + itemId + "_" + seq).val() + "');\">取消新版</a>");
    $("#fuh_" + groupId + "_hidItemValue_" + itemId + "_" + seq).val("newversion_" + $("#fuh_" + groupId + "_hidItemValue_" + itemId + "_" + seq).val());
}

function getVerisonListHolderFile(groupId, itemId, seq, defineid, referid) {
    var rangNum = GetRandomNum(1, 6000);

    $.get("/Document/GetFileDataListJson?referid=" + referid + "&defineid=" + defineid + "&sequence=" + seq + "&ran=" + rangNum, function (data) {
        var html = "<div class=\"bdot pr10 mt5 pb5 pl10\"><table>";
        $.each(data.list, function (i, item) {
            html = html + "<tr><td class=\"w20\">" + item["Version"] + "</td><td><a href=\"" + item["Url"] + "\">" + item["OriginalFileName"] + "</a></td><td>" + item["InsertTime"] + "</td></tr>";
        });
        html = html + "</table></div>";
        $("#spanright_" + groupId + "_" + itemId + "_" + seq).html(html);
    });

}

function cancelHolderFile(groupId, itemId, seq, id) {
    $("#spandoc_" + groupId + "_" + itemId + "_" + seq).show();
    $("#spanfile_" + groupId + "_" + itemId + "_" + seq).hide();
    $("#spanright_" + groupId + "_" + itemId + "_" + seq).html("");
    $("#fuh_" + groupId + "_hidItemValue_" + itemId + "_" + seq).val(id);
}

function addPickerRow(pickerSequence, inputId, inputCss, openWindowWidth, openSelectType, enableRadio, inputText, inputValue, selected, bidid) {
    var radioHtml = "";
    if (enableRadio == 1) {
        radioHtml = "<input type=\"radio\" id=\"rb" + inputId + "_" + pickerSequence + "\" name=\"rb" + inputId + "\" value=\"" + pickerSequence + "\" ";
        if (selected)
            radioHtml = radioHtml + "checked=\"checked\" ";
        radioHtml = radioHtml + "/> ";
    }
    var html = "<div class=\"pt5\" id=\"t_" + inputId + "_" + pickerSequence + "\">" + radioHtml + "<input type=\"text\" class=\"" + inputCss + "\" id=\"" + inputId + "_" + pickerSequence + "\" name=\"" + inputId + "_" + pickerSequence + "\" value=\"" + inputText + "\" /><a class=\"toolbtn toolbtn_addh\" href=\"javascript:openSelectData('" + inputId + "_" + pickerSequence + "'," + openWindowWidth + "," + openSelectType + ");\">选择</a>    <a href=\"javascript:deleteSelectData('" + inputId + "_" + pickerSequence + "')\">删除</a>";
    html = html + "<input type=\"hidden\" value=\"" + inputValue + "\" name=\"hid" + inputId + "_" + pickerSequence + "\" id=\"hid" + inputId + "_" + pickerSequence + "\"  /><input type=\"hidden\" value=\"" + bidid + "\"  name=\"hid" + inputId + "Id_" + pickerSequence + "\" /><input type=\"hidden\" value=\"" + pickerSequence + "\"  name=\"hid" + inputId + "Seq\" />";
    html = html + "</div>";
    $("#div_" + inputId + "").append(html);
}
function addPickerRowWithType(pickerSequence, inputId, inputCss, openWindowWidth, openSelectType, enableRadio, inputText, inputValue, selected, bidid, type) {
    var radioHtml = "";
    if (enableRadio == 1) {
        radioHtml = "<input type=\"radio\" id=\"rb" + inputId + "_" + pickerSequence + "\" name=\"rb" + inputId + "\" value=\"" + pickerSequence + "\" ";
        if (selected)
            radioHtml = radioHtml + "checked=\"checked\" ";
        radioHtml = radioHtml + "/> ";
    }
    var html = "<div class=\"pt5\" id=\"t_" + inputId + "_" + pickerSequence + "\">" + radioHtml + "<input type=\"text\" class=\"" + inputCss + "\" id=\"" + inputId + "_" + pickerSequence + "\" name=\"" + inputId + "_" + pickerSequence + "\" value=\"" + inputText + "\" /><a class=\"toolbtn toolbtn_addh\" href=\"javascript:openSelectDataWithType('" + inputId + "_" + pickerSequence + "'," + openWindowWidth + "," + openSelectType + ",'" + type + "');\">选择</a>    <a href=\"javascript:deleteSelectData('" + inputId + "_" + pickerSequence + "')\">删除</a>";
    html = html + "<input type=\"hidden\" value=\"" + inputValue + "\" name=\"hid" + inputId + "_" + pickerSequence + "\" id=\"hid" + inputId + "_" + pickerSequence + "\"  /><input type=\"hidden\" value=\"" + bidid + "\"  name=\"hid" + inputId + "Id_" + pickerSequence + "\" /><input type=\"hidden\" value=\"" + pickerSequence + "\"  name=\"hid" + inputId + "Seq\" />";
    html = html + "</div>";
    $("#div_" + inputId + "").append(html);
}
//异步取数据到页面元素上
function ajaxGetToElement(url, elmId) {
    var rangNum = GetRandomNum(1, 8000);
    var utag;
    if (url.indexOf("?") > 0)
        utag = "&";
    else
        utag = "?";
    $.get(url + utag + "ran=" + rangNum, function (data) {
        $("#" + elmId).html(data);
    });
    var subid = url.split('subid=')[1];
    if (subid != undefined) {
        if (subid.indexOf("&") > 0) {

            setProjectSubListSelected(subid.split("&")[0]);
        }
        else
            setProjectSubListSelected(subid);
    }
}

//显示更多的审核历史信息
function showMoreHistory(obj, hideIndex) {
    var cont = $(obj).parent().parent();
    var tblTr = $(".datalist tr", cont);
    if ($(obj).attr("class") == "down") {

        tblTr.show();
        $(obj).attr("class", "up");
    }
    else {
        for (var i = 0; i < tblTr.length; i++) {
            if (i > hideIndex) {
                $(tblTr[i]).hide();
            }
        }
        $(obj).attr("class", "down");
    }
}
function Arabia_to_Chinese(Num) {
    for (i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "")//替换tomoney()中的“,”
        Num = Num.replace(" ", "")//替换tomoney()中的空格
    }
    Num = Num.replace("￥", "")//替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        return;
    }
    //---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) { return ""; } //若数量超过拾亿单位，提示
        tmpnewchar = ""
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0": tmpnewchar = "零" + tmpnewchar; break;
            case "1": tmpnewchar = "壹" + tmpnewchar; break;
            case "2": tmpnewchar = "贰" + tmpnewchar; break;
            case "3": tmpnewchar = "叁" + tmpnewchar; break;
            case "4": tmpnewchar = "肆" + tmpnewchar; break;
            case "5": tmpnewchar = "伍" + tmpnewchar; break;
            case "6": tmpnewchar = "陆" + tmpnewchar; break;
            case "7": tmpnewchar = "柒" + tmpnewchar; break;
            case "8": tmpnewchar = "捌" + tmpnewchar; break;
            case "9": tmpnewchar = "玖" + tmpnewchar; break;
        }
        switch (part[0].length - i - 1) {
            case 0: tmpnewchar = tmpnewchar + "元"; break;
            case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
            case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
            case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
            case 4: tmpnewchar = tmpnewchar + "万"; break;
            case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
            case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
            case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
            case 8: tmpnewchar = tmpnewchar + "亿"; break;
            case 9: tmpnewchar = tmpnewchar + "拾"; break;
        }
        newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            //alert("小数点之后只能保留两位,系统将自动截段");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0": tmpnewchar = "零" + tmpnewchar; break;
                case "1": tmpnewchar = "壹" + tmpnewchar; break;
                case "2": tmpnewchar = "贰" + tmpnewchar; break;
                case "3": tmpnewchar = "叁" + tmpnewchar; break;
                case "4": tmpnewchar = "肆" + tmpnewchar; break;
                case "5": tmpnewchar = "伍" + tmpnewchar; break;
                case "6": tmpnewchar = "陆" + tmpnewchar; break;
                case "7": tmpnewchar = "柒" + tmpnewchar; break;
                case "8": tmpnewchar = "捌" + tmpnewchar; break;
                case "9": tmpnewchar = "玖" + tmpnewchar; break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (Num == "" || Num == 0)
        newchar = "";
    return newchar;

}

//获取item所在的dialog
function getWrappedDialog(item) {
    var dialog = $(item).parents(".ui-dialog-content");
    return dialog;
}
//关闭item所在的dialog
function closeWrappedDialog(item) {
    var dialog = $(item).parents(".ui-dialog-content");
    dialog.dialog("close");
}

//使item所在的dialog居中
function centerWrappedDialog(item) {
    var dialog = $(item).parents(".ui-dialog-content");
    dialog.dialog("option", "position", "center");
}

$.fn.extend({
    contextMenu: function () {
        $(this).each(function () {
            var menu = $(">ul", this).addClass("contextmenu-content");
            menu.appendTo("body");
                var _this = $(this);
            $(this).add(menu).hover(function () {
                menu.css({
                    "top": _this.offset().top + _this.height()-1,
                    "left": _this.offset().left - 1
                });
                menu.toggle();
                _this.toggleClass("contextmenu-hover");
                return false;
            })
        });
        return this;
    }
});
//显示loading, text:显示的文本内容，默认为“加载中，请稍候……”
function showLoading(text) {
    if (typeof text === "undefined") {
        text = "加载中，请稍候……";
    }
    var tip = window.__LOADINGTIP__;
    if (!tip) {
        tip = window.__LOADINGTIP__ = $("<div class='ui-loading-tip-content'></div>").dialog({
            modal: true,
            autoOpen: false,
            dialogClass: "ui-loading-tip",
            closeOnEscape: false,
            resizable: false,
            minHeight: 0
        });
    }
    tip.text(text).dialog("open");
}
function hideLoading() {
    window.__LOADINGTIP__ && window.__LOADINGTIP__.dialog("close");
}
//设置url字符串中的参数
function setUrlParam(url, name, value) {
    var ret = url, match = false;
    ret = url.replace(new RegExp("[?|^|&]" + name + "\=[^&]*", "g"), function (str) { match = true; var arr = str.split("="); arr[1] = value; return arr.join("=") });
    if (!match) {
        ret = ret + (ret.indexOf("?") >= 0 ? "&" : "?") + name + "=" + value;
    }
    return ret;
}

function exportExcelBg() {
    $("#SubmitInfo").show().css({
        "left": (document.body.clientWidth - $("#SubmitInfo").width()) / 2,
        "top": (document.documentElement.clientHeight - $("#SubmitInfo").height()) / 2 + document.documentElement.scrollTop
    }).html("数据加载中，请稍后");
    $("#SubmitMask").show().css({
        "opacity": .3,
        "height": Math.max(document.documentElement.offsetHeight, document.body.scrollHeight)
    })
}


//对id节点下的所有的a 定义click事件
function setLink(id) {
    if (id == undefined)
        id = "body";
    else
        id = "#" + id;

    $(id + " a").each(function () {
        var href = $(this).attr("href");

        if (href == undefined)
            return true;
        if (href.indexOf("javascript") == -1 && href.indexOf("#") == -1) {
            $(this).unbind("click").click(function () {

                switch (this.target) {
                    case "_new": //弹出窗口
                        this.width = request.QueryString("width", href);
                        this.height = request.QueryString("height", href);
                        var win = new ajaxWin({
                            url: href,
                            height: this.height,
                            width: this.width,
                            title: this.title
                        });
                        win.open();
                        break;
                    case "_window": //弹窗本身load
                        loadWindow(href, this.title);
                        break;
                    case "_delete": //删除连接
                        deleteData(href);
                        break;
                    case "_main":
                        {
                            var _href = this.href;
                            $("#main").loadUrl(this.href);

                            break;
                        }
                    case "_blank":
                    case "_self":
                    case "_top":
                    case "":
                    case null:
                        return true;
                        break;
                    case undefined:
                    case "undefined":
                        href = "#";
                        return false;
                        break;
                    default:
                        if (this.target != "")
                            if ($("#" + this.target).length > 0) {
                                $("#" + this.target).loadUrl(href);
                            }
                            else {
                                this.target = "";
                                return true;
                            }
                        break;
                }
                return false;
            });
        }
        else
            return true;
    });
}


function calDaysWithoutWeekend(date1,date2) {
    var d1 = date1.split("-");
    var d2 = date2.split("-");
    var date1 = new Date(d1[0], d1[1] - 1, d1[2]);
    var date2 = new Date(d2[0], d2[1] - 1, d2[2]);

    var day = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

    var w1 = date1.getDay();
    var w2 = date2.getDay();

    var w = parseInt(day / 7) * 2;
    w += w1 > w2 ? 2 : (w1 == 0||w2==6) ? 1 : 0;

    return day - w ;
}


function openOutLook(to, cc, subject, content,from) {
    try{
        var outlookApp = new ActiveXObject("Outlook.Application");
        var nameSpace = outlookApp.getNameSpace("MAPI");
        var mailItem = outlookApp.CreateItem(0);
        mailItem.Subject = subject;
        mailItem.To = to;
        mailItem.CC = cc;
        mailItem.HTMLBody = content;
        mailItem.SentOnBehalfofName = from;
        mailItem.Display(0); 
        mailItem = null; 
        nameSpace = null; 
        outlookApp = null
    } catch (e) {
        alert("Please check your IE ActiveX setting.");
    }
}


function timeCompare(inputName1, inputName2) {
    
    if ($("#" + inputName1).val() == "" || $("#" + inputName2).val() == "") {
        return 0;
    }
    else {
        var a = Date.parse($("#" + inputName1).val());
        var b = Date.parse($("#" + inputName2).val());

        if (a < b)
            return 1;//前者小于后者
        else if (a > b)
            return 2;//前者大于后者
        else
            return 3;//等于
    }
}