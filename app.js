setScreenMetrics(1080, 2340);

//获取用户配置
var storage = storages.create("jianshe_config");
bank_pwd = storage.get("bank_pwd");
devide_id = storage.get("devide_id");
devide_key = storage.get("devide_key");
server_addr = storage.get("server_addr");

// 密码输入框数字键盘 x轴坐标 0~9
var point = [1010, 60, 160, 280, 380, 490, 590, 700, 800, 910];

// 脚本每次首次运行，是否需要先进行一次登录验证

while(true){

    var order = {
        orderNo: "df1234",
        name: "王大锤",
        account: "6216262000000099999",
        money: 10.2
    };

    // 请求分配订单API
    if(order == null){
        sleep(30 * 1000);
    } else {
        // 检查是否已在建行APP里
        if(!currentActivity().startsWith("com.ccb")){
            launch();
        }
        toastLog(currentActivity());
        // 进入转账页面
        waitForActivity("com.ccb.start.MainActivity");
        if(currentActivity() == "com.ccb.start.MainActivity"){
            toastLog("进入转账页面");
            var entry = text("转账").findOne();
            fClick(entry);
            //click(398, 731);
            sleep(2000);
            waitForActivity("com.ccb.transfer.transfer_home.view.TransferHomeAct");
        }
        toastLog(currentActivity());
        if(currentActivity() == "com.ccb.transfer.transfer_home.view.TransferHomeAct"){
            click(155,382);
            sleep(3000);
        }
        
        if(currentActivity() == "com.ccb.framework.security.login.internal.view.LoginActivity"){
            login();
            sleep(3000);
        }

        toastLog(currentActivity());
        waitForActivity("com.ccb.transfer.smarttransfer.view.SmartTransferMainAct");
        if(currentActivity() == "com.ccb.transfer.smarttransfer.view.SmartTransferMainAct"){
            setText(0, order.name);
            sleep(1000);
            click(485, 706);
            sleep(500);

            setText(1, order.account);
            sleep(500);
            click(485, 706);
            sleep(500);
            click(978, 1647);
            sleep(3000);

            setText(2, order.money);
            sleep(500);
        
            click(550, 2184);
        }

        //验证码
        waitForActivity("com.ccb.framework.security.transecurityverify.TransSecurityVerifyDialogAct");
        if(currentActivity() == "com.ccb.framework.security.transecurityverify.TransSecurityVerifyDialogAct"){
            toastLog("yanzhengma");
        }
    }
}

function launch(){
    launchApp("中国建设银行");
    toastLog("等待建行APP启动");
    sleep(6000);

    //click(545, 1680);

    sleep(1000);
    //back();
}

function login(){
    //输入密码
    var pwd_btn = bank_pwd.split("");
    for(i in pwd_btn){
        //toastLog("点击" + point[pwd_btn[i]]);
        click(point[pwd_btn[i]], 1800);
        sleep(500);
    } 

    var entry = text("登录").findOne();
    fClick(entry);
    //click(541, 1026);
    toastLog("登录中");
}

/*********************
 *     功能函数区     *
 ********************/
// 点击控件（针对不可点击的控件）
function fClick(butt_, for_time, interval) {
  //3个参数自带坐标偏移
  //1.找到的控件 2.点击该控件次数 3.点击延迟
  if (!for_time) {
      for_time = 1; //没输入则默认为点击1次
  }
  if (!interval) {
      interval = 200; //没输入则默认为点击后延迟200ms
  }
  let bb = butt_.bounds();
  while (for_time--) {
      click(bb.centerX() + random(-10, 10), bb.centerY() + random(-10, 10));
      sleep(interval);
  }
}