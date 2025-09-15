import { ref } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';
import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
// 变量声明区
const sidebarButtons = ref([
    {
        id: 'course',
        label: '我的课程',
        path: '/course' // 添加 path 属性
    },
    {
        id: 'certificate',
        label: '我的证书',
        path: '/certificate' //TODO: 示例路径，您需要创建对应路由
    },
    {
        id: 'levelTest',
        label: '等级考试',
        path: '/levelTest' //TODO: 示例路径，您需要创建对应路由
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "sidebar" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "sidebar-menu" },
});
const __VLS_0 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
ElMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "layout-menu" },
    router: true,
    defaultActive: (__VLS_ctx.$route.path),
    textColor: "#64a0fd",
    activeTextColor: "#ffffff",
    backgroundColor: "#e7f0ff",
    activeBackgroundColor: "linear-gradient(to right, #6696ff, #63a2fd)",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "layout-menu" },
    router: true,
    defaultActive: (__VLS_ctx.$route.path),
    textColor: "#64a0fd",
    activeTextColor: "#ffffff",
    backgroundColor: "#e7f0ff",
    activeBackgroundColor: "linear-gradient(to right, #6696ff, #63a2fd)",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[$route,];
for (const [button] of __VLS_getVForSourceType((__VLS_ctx.sidebarButtons))) {
    // @ts-ignore
    [sidebarButtons,];
    const __VLS_5 = {}.ElMenuItem;
    /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
    // @ts-ignore
    ElMenuItem;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        key: (button.id),
        index: (button.path),
        ...{ class: "sidebar-menu-item" },
    }));
    const __VLS_7 = __VLS_6({
        key: (button.id),
        index: (button.path),
        ...{ class: "sidebar-menu-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    /** @type {[typeof MyIcon, typeof MyIcon, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
        name: (button.id),
        ...{ style: {} },
    }));
    const __VLS_11 = __VLS_10({
        name: (button.id),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    (button.label);
    if (__VLS_ctx.$route.path === button.path) {
        // @ts-ignore
        [$route,];
        /** @type {[typeof MyIcon, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
            name: "whiteRadius",
            ...{ class: "radius-icon" },
            ...{ style: {} },
        }));
        const __VLS_15 = __VLS_14({
            name: "whiteRadius",
            ...{ class: "radius-icon" },
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    var __VLS_8;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['radius-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElMenu: ElMenu,
            ElMenuItem: ElMenuItem,
            MyIcon: MyIcon,
            sidebarButtons: sidebarButtons,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
