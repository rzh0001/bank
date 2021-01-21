launchApp("中国建设银行");
toastLog("等待建行APP启动");
waitForActivity("com.ccb.start.MainActivity");
sleep(4000);

toastLog("寻找转账按钮");
toastLog(text("转账").findOne());
sleep(1000);

