import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
// 变量声明区
const route = useRoute();
const router = useRouter();
// 模拟的完整课程数据库
const courseLevelData = ref(null);
const courseLevelsDatabase = [
    {
        id: 1,
        title: 'L1.认知基础',
        courses: [
            {
                id: 101,
                title: '课程一：初识AI',
                description: '这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 102,
                title: '课程二：简单指令',
                description: '学习如何向AI下达清晰、简单的指令。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 103,
                title: '课程三：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 104,
                title: '课程四：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 105,
                title: '课程五：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 106,
                title: '课程六：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 107,
                title: '课程七：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            },
            {
                id: 108,
                title: '课程八：创意绘画',
                description: '探索如何使用AI进行简单的创意绘画。',
                image: 'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
            }
        ]
    },
    {
        id: 2,
        title: 'L2.专项训练',
        courses: [
            {
                id: 201,
                title: '课程一：逻辑思维',
                description: '通过AI挑战，锻炼和提升你的逻辑思维能力。',
                image: 'https://via.placeholder.com/400x225.png/6696ff/ffffff?text=Logic'
            },
            {
                id: 202,
                title: '课程二：数据分析',
                description: '学习如何利用AI工具对数据进行初步分析。',
                image: 'https://via.placeholder.com/400x225.png/63a2fd/ffffff?text=Data'
            }
        ]
    }
];
// 逻辑处理区
onMounted(() => {
    const courseId = Number(route.params.id);
    if (!isNaN(courseId)) {
        const foundCourse = courseLevelsDatabase.find(level => level.id === courseId);
        if (foundCourse) {
            courseLevelData.value = foundCourse;
        }
        else {
            console.error('未找到对应的课程等级');
        }
    }
});
const goToCourseDetail = (courseId) => {
    router.push(`/course/detail/${courseId}`);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['course-info']} */ ;
/** @type {__VLS_StyleScopedClasses['course-image-background']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-text']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-mainpage-wrapper" },
});
/** @type {[typeof BackButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BackButton, new BackButton({
    ...{ class: "back-button" },
    to: "/course",
}));
const __VLS_1 = __VLS_0({
    ...{ class: "back-button" },
    to: "/course",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-mainpage-maintainer" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-mainpage-header" },
});
/** @type {[typeof MyIcon, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
    name: "VmyClass",
}));
const __VLS_5 = __VLS_4({
    name: "VmyClass",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "course-mainpage-content" },
});
for (const [course] of __VLS_getVForSourceType((__VLS_ctx.courseLevelData?.courses))) {
    // @ts-ignore
    [courseLevelData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (course.id),
        ...{ class: "course-card" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "course-image-background" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "image-backing" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (course.image),
        alt: "Course Image",
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goToCourseDetail(course.id);
                // @ts-ignore
                [goToCourseDetail,];
            } },
        ...{ class: "start-button" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "course-info" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ style: {} },
    });
    (course.title);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ style: {} },
    });
    (course.description);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "course-edition" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ style: {} },
    });
    /** @type {[typeof MyIcon, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
        name: "courseContent",
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        name: "courseContent",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        ...{ onClick: () => { } },
        href: "#",
        ...{ class: "clickable-text" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.circle)({
        ...{ class: "grey-dot" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        ...{ onClick: () => { } },
        href: "#",
        ...{ class: "clickable-text" },
    });
    __VLS_asFunctionalElement(__VLS_elements.circle)({
        ...{ class: "grey-dot" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        ...{ onClick: () => { } },
        href: "#",
        ...{ class: "clickable-text" },
    });
}
/** @type {__VLS_StyleScopedClasses['course-mainpage-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['back-button']} */ ;
/** @type {__VLS_StyleScopedClasses['course-mainpage-maintainer']} */ ;
/** @type {__VLS_StyleScopedClasses['course-mainpage-header']} */ ;
/** @type {__VLS_StyleScopedClasses['course-mainpage-content']} */ ;
/** @type {__VLS_StyleScopedClasses['course-card']} */ ;
/** @type {__VLS_StyleScopedClasses['course-image-background']} */ ;
/** @type {__VLS_StyleScopedClasses['image-backing']} */ ;
/** @type {__VLS_StyleScopedClasses['start-button']} */ ;
/** @type {__VLS_StyleScopedClasses['course-info']} */ ;
/** @type {__VLS_StyleScopedClasses['course-edition']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-text']} */ ;
/** @type {__VLS_StyleScopedClasses['grey-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-text']} */ ;
/** @type {__VLS_StyleScopedClasses['grey-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BackButton: BackButton,
            MyIcon: MyIcon,
            courseLevelData: courseLevelData,
            goToCourseDetail: goToCourseDetail,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
