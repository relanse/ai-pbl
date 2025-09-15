import { useRouter } from 'vue-router';
import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
const props = defineProps();
const router = useRouter();
// 点击事件处理函数
const handleBack = () => {
    if (props.to) {
        // 如果 'to' 属性存在，则导航到指定路径
        router.push(props.to);
    }
    else {
        // 否则，执行默认的返回操作
        router.back();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.handleBack) },
    ...{ class: "back-button" },
});
// @ts-ignore
[handleBack,];
/** @type {[typeof MyIcon, typeof MyIcon, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
    name: "backArrow",
    ...{ class: "back-icon" },
}));
const __VLS_1 = __VLS_0({
    name: "backArrow",
    ...{ class: "back-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "back-text" },
});
/** @type {__VLS_StyleScopedClasses['back-button']} */ ;
/** @type {__VLS_StyleScopedClasses['back-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['back-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MyIcon: MyIcon,
            handleBack: handleBack,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
