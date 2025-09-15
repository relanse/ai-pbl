import { ElInput } from 'element-plus';
import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
defineOptions({
    name: 'MyInput',
    inheritAttrs: false
});
// 定义组件的属性
const props = defineProps({
    // 继承 el-input 的 modelValue
    modelValue: {
        type: [String, Number],
        default: ''
    },
    // 自定义图标名称
    icon: {
        type: String,
        default: ''
    }
});
// 定义事件
const __VLS_emit = defineEmits(['update:modelValue']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['my-input']} */ ;
/** @type {__VLS_StyleScopedClasses['my-input']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    ...{ class: "my-input" },
    modelValue: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    ...{ class: "my-input" },
    modelValue: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.$emit('update:modelValue', $event);
            // @ts-ignore
            [modelValue, $emit,];
        } });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
if (__VLS_ctx.icon) {
    // @ts-ignore
    [icon,];
    {
        const { prefix: __VLS_9 } = __VLS_3.slots;
        /** @type {[typeof MyIcon, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
            name: (__VLS_ctx.icon),
            ...{ class: "input-icon" },
        }));
        const __VLS_11 = __VLS_10({
            name: (__VLS_ctx.icon),
            ...{ class: "input-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        // @ts-ignore
        [icon,];
    }
}
for (const [_, name] of __VLS_getVForSourceType((__VLS_ctx.$slots))) {
    // @ts-ignore
    [$slots,];
    {
        const { [__VLS_tryAsConstant(name)]: __VLS_14 } = __VLS_3.slots;
        const [slotData] = __VLS_getSlotParameters(__VLS_14);
        var __VLS_15 = {
            ...(slotData),
        };
        var __VLS_16 = __VLS_tryAsConstant(name);
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['my-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-icon']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16, __VLS_18 = __VLS_15;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElInput: ElInput,
            MyIcon: MyIcon,
        };
    },
    emits: {},
    props: {
        // 继承 el-input 的 modelValue
        modelValue: {
            type: [String, Number],
            default: ''
        },
        // 自定义图标名称
        icon: {
            type: String,
            default: ''
        }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
    },
    emits: {},
    props: {
        // 继承 el-input 的 modelValue
        modelValue: {
            type: [String, Number],
            default: ''
        },
        // 自定义图标名称
        icon: {
            type: String,
            default: ''
        }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
