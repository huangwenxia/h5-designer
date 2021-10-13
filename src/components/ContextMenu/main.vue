<!--
 * @description     表格右键菜单
 *
 * @author          重阳
 * @create          2020-01-09 15:00
-->
<template>
    <div class="context-menu" v-show="visible" :style="contextMenuStyle">
        <div class="context-item" v-for="(item,index) in contextMenuList" :key="index" :disabled="item.disabled" :class="['color-'+item.color]" @mouseup.stop="handleClick(item,$event)">
            <span class="icon"><i :class="item.icon"></i></span>
            <span class="name">{{item.title}}</span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContextMenu',
    components: {},
    data() {
        return {
            visible: false,
            contextMenuList: [],
            options: {},
            contextMenuStyle: {}
        }
    },
    computed: {},
    mounted() {
        var _t = this;
        this.handleContextMenuStyle();
        document.addEventListener('mouseup', _t.doHide,false)
    },
    beforeDestroy(){
        
    },
    methods: {
        handleContextMenuStyle() {
            let _t = this
            // console.log(_t.options, '_t.options')
            let style = {}
            if (!_t.options) {
                return style
            }
            if(_t.options.event){
                _t.options.x = _t.options.event.pageX;
                _t.options.y = _t.options.event.pageY;
            }
            setTimeout(function() {
                let x = _t.options.x !== undefined ? (parseInt(_t.options.x) > 0 ? parseInt(_t.options.x) : 0) : 0
                let y = _t.options.y !== undefined ? (parseInt(_t.options.y) > 0 ? parseInt(_t.options.y) : 0) : 0
                // 判断是否超出边界
                if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                    let scrollHeight = document.documentElement.scrollHeight
                    let winHeight = document.documentElement.clientHeight
                    let scrollTop = document.documentElement.scrollTop
                    let winWidth = document.documentElement.clientWidth
                    let elHeight = _t.$el.offsetHeight
                    let elWidth = _t.$el.offsetWidth
                    if (x + elWidth > winWidth) {
                        style['right'] = '10px'
                    } else {
                        style['left'] = x + 'px'
                    }
                    if (y + elHeight - scrollTop > winHeight) {
                        style['top'] = y - elHeight +'px'
                    } else {
                        style['top'] = y + 'px'
                    }
                }
                // console.log('options', _t.options)
                // console.log('style', style)
                _t.contextMenuStyle = style
            })
        },
        doHide() {
            let _t = this
            _t.options = null
            _t.contextMenuList = []
            _t.visible = false
            document.removeEventListener('mouseup', _t.doHide,false)
            _t.doClose();
        },
        handleClick(item, event) {
            let _t = this
            if(item.disabled) return
            item.click&&item.click();
            _t.doHide()
        },
    },
}
</script>
<style scoped lang="scss">
.context-menu {
    position: absolute;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
    padding: 5px 0;border-radius:3px;
    // z-index: 999;
    top: -99999px;

    .context-item {
        padding: 5px 10px;
        cursor: pointer;
        font-size: 13px;
        border-bottom: 1px solid #fff;
        &:hover {
            // color: #000000;
            background: rgba(0, 0, 0, .05);

            .tool-box {
                visibility: visible;
            }
        }
        &[disabled]{
            cursor: not-allowed;
            color: #999;
            background: #f4f4f4;
        }

        .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            color: #666;
        }

        .item-label {}

        .item-more {
            display: inline-block;
            float: right;
            width: 16px;
            height: 16px;
        }
    }

    .divider {
        // width: calc("100% - 10px");
    }
}
</style>