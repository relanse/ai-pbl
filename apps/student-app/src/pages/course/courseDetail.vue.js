import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
// 变量声明区
const route = useRoute();
// 生命周期钩子区
onMounted(() => {
    const courseId = route.params.id;
    console.log('接收到的课程ID是:', courseId);
});
// 方法区
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-detail-wrapper" },
});
/** @type {[typeof BackButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BackButton, new BackButton({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {__VLS_StyleScopedClasses['course-detail-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BackButton: BackButton,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
