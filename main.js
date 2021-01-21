"ui";

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="建设助手v1.0.1"/>
        </appbar>

        <card w="*" h="35" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical>
                <horizontal padding="10 0" h="auto">
                <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="10 8 8 8" textSize="14sp"/>

                </horizontal>
            </vertical>
            
            <View bg="#4caf50" h="*" w="9"/>
        </card>
        <card w="*" h="80" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical>
                <horizontal padding="10 0" h="auto">
                    <text text="银行密码:" textStyle="bold" marginLeft="10" textColor="#222222" textSize="16sp"/>
                    <input id="bank_pwd" password="true" w="*" />
                </horizontal>
                <text text="建设银行密码请设置为6位数字" padding="10 0" marginLeft="10" textColor="red" textSize="16sp" />
            </vertical>
            
            <View bg="#4caf50" h="*" w="9"/>
        </card>
        <card w="*" h="100" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical>
                <horizontal padding="10 0" h="auto">
                    <text text="设备编号:" textStyle="bold" marginLeft="10" textColor="#222222" textSize="16sp"/>
                    <input id="devide_id" w="*" />
                </horizontal>
                <horizontal padding="10 0" h="auto">
                    <text text="设备密钥:" textStyle="bold" marginLeft="10" textColor="#222222" textSize="16sp"/>
                    <input id="devide_key" password="true" w="*" />
                </horizontal>
            </vertical>
            
            <View bg="#2196f3" h="*" w="9"/>
        </card>
       
        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="10 0" h="auto">
                <text text="服务器地址:" textStyle="bold" marginLeft="10" marginTop="10" textColor="#222222" textSize="16sp"/>
                <input id="server_addr" marginLeft="10" w="*" />
            </vertical>
            <View bg="#ff5722" h="*" w="9"/>
        </card>
        
        <horizontal margin="10 5">
          <button id="btn" text="开 始 运 行" style="Widget.AppCompat.Button.Colored" w="180" layout_gravity="center"/>
          <button id="btn_stop" text="停 止 运 行" textColor="red" style="Widget.AppCompat.Button" w="180" layout_gravity="center"/>
        </horizontal>

    </vertical>
);
var storage = storages.create("jianshe_config");
var bank_pwd = storage.get("bank_pwd");
if(bank_pwd != null){
    ui.bank_pwd.setText(bank_pwd);
}
var devide_id = storage.get("devide_id");
if(devide_id != null){
    ui.devide_id.setText(devide_id);
}
var devide_key = storage.get("devide_key");
if(devide_key != null){
    ui.devide_key.setText(devide_key);
}
var server_addr = storage.get("server_addr");
if(server_addr != null){
    ui.server_addr.setText(server_addr);
}

deviceInfo();

ui.btn.on("click", ()=>{
    storage.put("bank_pwd", ui.bank_pwd.text());
    storage.put("devide_id", ui.devide_id.text());
    storage.put("devide_key", ui.devide_key.text());
    storage.put("server_addr", ui.server_addr.text());

    /* 
    var i = app.intent({
        action: Intent.ACTION_MAIN,
        category: Intent.CATEGORY_HOME,
        flags: ["ACTIVITY_NEW_TASK"]
    });
    context.startActivity(i);*/

    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }

    //app.startActivity("console");
    threads.start(function(){
        engines.execScriptFile("./app.js");
    });
});

ui.btn_stop.on("click", ()=>{
    threads.shutDownAll();
});

ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 设备信息
function deviceInfo(){
    log("设备机型：" + device.model);
    log("安卓版本：" + device.release);
    log("产品信息：" + device.product);
}