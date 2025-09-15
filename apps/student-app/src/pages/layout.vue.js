import { ElContainer, ElHeader, ElMain, ElAvatar } from 'element-plus';
import LogoImg from '@aipbl/common/assets/Logo.png';
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png';
import { useUserStore } from '@/stores/user';
import { RouterView } from 'vue-router';
import router from '@/router/index';
defineOptions({
    name: 'LayoutPage'
});
const jumpToUserInfo = () => {
    router.push('/user');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['layout-header-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-header-logo']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "common-layout" },
});
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
ElContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.ElHeader;
/** @type {[typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, ]} */ ;
// @ts-ignore
ElHeader;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "layout-header" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "layout-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "layout-header-logo" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.LogoImg),
    alt: "logo",
    ...{ class: "logo" },
});
// @ts-ignore
[LogoImg,];
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.jumpToUserInfo) },
    ...{ class: "layout-header-user" },
});
// @ts-ignore
[jumpToUserInfo,];
const __VLS_10 = {}.ElAvatar;
/** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
// @ts-ignore
ElAvatar;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    src: (__VLS_ctx.useUserStore().userState.avatarUrl || __VLS_ctx.DefaultAvatar),
    size: (45),
}));
const __VLS_12 = __VLS_11({
    src: (__VLS_ctx.useUserStore().userState.avatarUrl || __VLS_ctx.DefaultAvatar),
    size: (45),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[useUserStore, DefaultAvatar,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "username" },
});
(__VLS_ctx.useUserStore().userState.username || '用户');
// @ts-ignore
[useUserStore,];
var __VLS_8;
const __VLS_15 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
ElMain;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "layout-main" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "layout-main" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
const __VLS_20 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_18;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-header']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-header-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-header-user']} */ ;
/** @type {__VLS_StyleScopedClasses['username']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-main']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElContainer: ElContainer,
            ElHeader: ElHeader,
            ElMain: ElMain,
            ElAvatar: ElAvatar,
            LogoImg: LogoImg,
            DefaultAvatar: DefaultAvatar,
            useUserStore: useUserStore,
            RouterView: RouterView,
            jumpToUserInfo: jumpToUserInfo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
