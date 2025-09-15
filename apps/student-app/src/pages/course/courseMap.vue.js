import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard } from 'element-plus';
import MyButton from '@/components/common/MyButton.vue';
import CommonAside from '@/components/common/CommonAside.vue';
// 变量声明区
const router = useRouter();
const courseList = ref([
    {
        id: 1,
        title: 'L1.认知基础',
        description: '欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~',
        image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
    },
    {
        id: 2,
        title: 'L2.专项训练',
        description: '欢迎来到新手的世界打开你的新旅程吧~',
        image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
    },
    {
        id: 3,
        title: 'L3.综合应用',
        description: '欢迎来到新手的世界打开你的新旅程吧~',
        image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
    },
    {
        id: 4,
        title: 'L4.进阶挑战',
        description: '欢迎来到新手的世界打开你的新旅程吧~',
        image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
    }
]);
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
// 逻辑处理区
const goToCourseMainPage = (id) => {
    router.push(`/course/all/${id}`);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['course-map-maintainer']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-card']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-card']} */ ;
/** @type {__VLS_StyleScopedClasses['course-header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-content']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-map-wrapper" },
});
/** @type {[typeof CommonAside, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CommonAside, new CommonAside({
    ...{ class: "sidebar" },
}));
const __VLS_1 = __VLS_0({
    ...{ class: "sidebar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-map-maintainer" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
for (const [course] of __VLS_getVForSourceType((__VLS_ctx.courseList))) {
    // @ts-ignore
    [courseList,];
    const __VLS_4 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    ElCard;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        shadow: "never",
        ...{ class: "course-map-card" },
        key: (course.id),
    }));
    const __VLS_6 = __VLS_5({
        shadow: "never",
        ...{ class: "course-map-card" },
        key: (course.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    const { default: __VLS_8 } = __VLS_7.slots;
    {
        const { header: __VLS_9 } = __VLS_7.slots;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "course-header-title" },
        });
        (course.title);
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "course-map-content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (course.image),
        alt: "Course Image",
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "course-description" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (course.description);
    /** @type {[typeof MyButton, typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
        ...{ class: "entry-button" },
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        ...{ class: "entry-button" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.goToCourseMainPage(course.id);
                // @ts-ignore
                [goToCourseMainPage,];
            } });
    const { default: __VLS_16 } = __VLS_12.slots;
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ style: {} },
    });
    var __VLS_12;
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['course-map-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-maintainer']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-card']} */ ;
/** @type {__VLS_StyleScopedClasses['course-header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['course-map-content']} */ ;
/** @type {__VLS_StyleScopedClasses['course-description']} */ ;
/** @type {__VLS_StyleScopedClasses['entry-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElCard: ElCard,
            MyButton: MyButton,
            CommonAside: CommonAside,
            courseList: courseList,
            goToCourseMainPage: goToCourseMainPage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
