launchApp("中国建设银行");
toastLog("等待建行APP启动");
waitForActivity("com.ccb.start.MainActivity");
sleep(4000);

toastLog("查询是否出现广告页");
toastLog(text("广告").findOne());

//
sleep(4000);
toastLog(currentActivity());

//破解.源码出售.收徒.定制担保.诚信合作微信:zxkj6898 或 shenlong6898   或QQ168196007 
var bao = currentPackage();
var i = packageName(bao).find();
for (l = 0; l < i.length; l++) {
    if (i[l].text() != "") {
        log(i[l].text());
    };
};
toastLog("end");
//破解.源码出售.收徒.定制担保.诚信合作微信:zxkj6898 或 shenlong6898   或QQ168196007 
