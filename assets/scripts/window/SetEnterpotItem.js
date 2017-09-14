//设置仓库每个item的属性
cc.Class({
    extends: cc.Component,

    properties: {
        img:{//item图片
            default:null,
            type:cc.Sprite
        },
        num:{//item数量
            default:null,
            type:cc.Label
        },
        title:cc.String,//标题
        desc:cc.String,//介绍
        imgIndex:cc.Integer,//物品图片索引
        spriteList: {//图片列表
            default: [],
            type: [cc.SpriteFrame]
        },
        descPrefab:{
            default:null,
            type:cc.Prefab
        }
    },
    onLoad: function () {
        //this.setItme(1,'44');
        //this.node.on('touchend', function () {
        //    console.log("Item " + this.itemID + ' clicked');
        //}, this);

        //this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //    var action = cc.scaleTo(0.05, 0.9, 0.9);
        //    //var action = cc.scaleTo(0.05, 1.1, 1.1);
        //    this.node.runAction(action);
        //}, this);
    },
    setItme:function(img,num,title,desc){//设置item的显示数据
        this.imgIndex = img;
        this.img.spriteFrame = this.spriteList[img];
        this.num.string = num;
        this.title = title;
        this.desc = desc;
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
    },
    touchStart(){
        if(!Global.goodsDesc||!Global.goodsDesc.name){
            Global.goodsDesc = cc.instantiate(this.descPrefab);
        }
        let pos = this.node.getPosition();
        Global.goodsDesc.parent = this.node.parent.parent;
        Global.goodsDesc.setPosition(pos.x,pos.y+70);
        Global.goodsDesc.getComponent('GoodsInfo').showGoodInfo(
            this.spriteList[this.imgIndex],
            this.title,
            this.desc
        );
    },
    touchEnd(){
        Global.goodsDesc.getComponent('GoodsInfo').hideGoodInfo();
    }
    // update: function (dt) {

    // },
});