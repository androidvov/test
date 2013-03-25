//==================JavaScript信息编辑高级选项 Start===========================================//
String.prototype.trim = function () {
    return this.replace(/(^[\s　]*)|([\s　]*$)/g, "");
};
String.prototype.leftTrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rightTrim = function () {
    return this.replace(/(\s*$)/g, "");
};
/*
 格式化
 */

function test(){
    alert("aaa");
}
function AdvanceFormatText(TextAreaObjId, strValue) {
    var html = "";
    var contanier;
    if (strValue == "undefined" || (typeof strValue == undefined)) {
        contanier = $("<div>" + $("#" + TextAreaObjId).val() + "</div>");
    }
    else {
        contanier = $("<div>" + strValue + "</div>");
    }
    var images = new Array();
    var index = 0;
    var contanier_newstr = $(contanier).html();
    $(contanier).find("img").each(
                                  function () {
                                  t = document.createElement("IMG");
                                  t.alt = this.alt;
                                  t.src = this.src;
                                  if (this.width > 0)
                                  t.width = this.width;
                                  if (this.height > 0)
                                  t.height = this.height;
                                  t.align = this.align;
                                  images.push("<center>" + $("<div></div>").append($(t).clone()).html() + "</center>");
                                  contanier_newstr = contanier_newstr.replace($("<div></div>").append($(this).clone()).html(), "#FormatImage_" + index);
                                  index++;
                                  });
    $(contanier_newstr).each(
                             function () {
                             if ($(this).text().toString().trim().length > 0 && $(this).text().toString().trim() != "&nbsp;") {
                             html += $(this).text().toString().trim() + "\n";
                             }
                             });
    for (j = 0; j < images.length; j++) {
        html = html.replace("#FormatImage_" + j, images[j]);
    }
    html = processFormatText(html);
    alert(html);
    //var html = processFormatText($($("#" + TextAreaObjId).val()).text());
    $("#" + TextAreaObjId).val(html);
}
function processFormatText(textContext) {
    var text = DBC2SBC(textContext);
    var prefix = "　　";
    var tmps = text.split("\n");
    var html = "";
    for (i = 0; i < tmps.length; i++) {
        var tmp = tmps[i].trim();
        if (jQuery.trim(tmp).length > 0 && jQuery.trim(tmp) != "&nbsp;") {
            html += "<p>" + tmp + "</p>\n";
        }
    }
    return html;
}
function DBC2SBC(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);
        // “65281”是“！”，“65373”是“｝”，“65292”是“，”。不转换"，"
        if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
            //  “65248”是转换码距
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}