<template>
    <el-dialog :title="title" :visible="visible">
        {{ content }}
        <template v-slot:footer>
            <div>
                <el-button @click="ok">OK</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import Vue from "vue"
const Confirm = {
    name: 'Confirm',
    props: ['visible', 'title', 'content', 'onConfirm'],
    methods: {
        onOk() {
            this.onConfirm?.();
            this.visible = false;
        }
    }
}

export default Confirm;

let instanceCache
const getInstance = () => {
    if(instanceCache) {
        return instanceCache
    }
    const ConfirmCont = Vue.extend(Confirm);
    instanceCache = new Confirm();
}
export const confirm = function(title, content, onConfirm) {
    if(instanceCache) {
        instanceCache.title = title;
        instanceCache.content = content;
        instanceCache.onConfirm = onConfirm;
    } else {
        instanceCache = new Confirm({
            propsData: {
                title, content, onConfirm
            }
        })
        instanceCache.$mount();
        document.body.appendChild(instanceCache.$el);
    }

    instanceCache.visible = true;
}
</script>