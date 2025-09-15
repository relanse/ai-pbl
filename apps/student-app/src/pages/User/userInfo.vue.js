import { ElContainer, ElAside, ElMain, ElButton, ElAvatar, ElForm, ElFormItem, ElRow, ElOption } from 'element-plus';
import { ArrowLeftBold, EditPen } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png';
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import MySelect from '@/components/common/MySelect.vue';
import { Grade } from '@/types/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
    router.back();
};
const isEditing = ref(false);
const form = ref({
    name: '张明',
    age: 20,
    gender: '女',
    grade: Grade.Grade3,
    telephone: 1354689921,
    school: '逸夫中学',
    parent: '李四'
});
const originalForm = ref({ ...form.value });
const startEditing = () => {
    //备份原始数据
    originalForm.value = { ...form.value };
    isEditing.value = true;
};
const cancelEditing = () => {
    // 恢复原始数据
    form.value = { ...originalForm.value };
    isEditing.value = false;
};
const saveChanges = () => {
    console.log('保存用户信息:', form.value);
    originalForm.value = { ...form.value };
    isEditing.value = false;
};
const userGrade = [
    {
        value: Grade.Grade1,
        label: '一年级'
    },
    {
        value: Grade.Grade2,
        label: '二年级'
    },
    {
        value: Grade.Grade3,
        label: '三年级'
    },
    {
        value: Grade.Grade4,
        label: '四年级'
    },
    {
        value: Grade.Grade5,
        label: '五年级'
    },
    {
        value: Grade.Grade6,
        label: '六年级'
    }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['user-wrapped']} */ ;
/** @type {__VLS_StyleScopedClasses['user-header']} */ ;
/** @type {__VLS_StyleScopedClasses['user-main']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['el-select__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['el-select__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['is-disabled']} */ ;
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
const __VLS_5 = {}.ElAside;
/** @type {[typeof __VLS_components.ElAside, typeof __VLS_components.elAside, typeof __VLS_components.ElAside, typeof __VLS_components.elAside, ]} */ ;
// @ts-ignore
ElAside;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    width: "200px",
}));
const __VLS_7 = __VLS_6({
    width: "200px",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "user-aside" },
});
const __VLS_10 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ 'onClick': {} },
    round: true,
    icon: (__VLS_ctx.ArrowLeftBold),
    size: "large",
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    round: true,
    icon: (__VLS_ctx.ArrowLeftBold),
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_17 } = __VLS_13.slots;
// @ts-ignore
[ArrowLeftBold, goBack,];
var __VLS_13;
var __VLS_8;
const __VLS_18 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
ElMain;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ class: "user-wrapped" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "user-wrapped" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_22 } = __VLS_21.slots;
__VLS_asFunctionalElement(__VLS_elements.img)({
    ...{ class: "waveLeft" },
    src: "@/assets/waveLeft.png",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    ...{ class: "waveRight" },
    src: "@/assets/waveRight.png",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "user-header" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "user-container" },
});
const __VLS_23 = {}.ElAvatar;
/** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
// @ts-ignore
ElAvatar;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ class: "user-img" },
    src: (__VLS_ctx.useUserStore().userState.avatarUrl || __VLS_ctx.DefaultAvatar),
    size: (90),
}));
const __VLS_25 = __VLS_24({
    ...{ class: "user-img" },
    src: (__VLS_ctx.useUserStore().userState.avatarUrl || __VLS_ctx.DefaultAvatar),
    size: (90),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[useUserStore, DefaultAvatar,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "user-info" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ style: {} },
});
(__VLS_ctx.useUserStore().userState.username || '用户');
// @ts-ignore
[useUserStore,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ style: {} },
});
(__VLS_ctx.useUserStore().userState.userid || 'hsksjsjhggg');
// @ts-ignore
[useUserStore,];
if (!__VLS_ctx.isEditing) {
    // @ts-ignore
    [isEditing,];
    const __VLS_28 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        ...{ class: "edit-btn" },
        round: true,
        icon: (__VLS_ctx.EditPen),
        size: "large",
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        ...{ class: "edit-btn" },
        round: true,
        icon: (__VLS_ctx.EditPen),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    const __VLS_34 = ({ click: {} },
        { onClick: (__VLS_ctx.startEditing) });
    const { default: __VLS_35 } = __VLS_31.slots;
    // @ts-ignore
    [EditPen, startEditing,];
    var __VLS_31;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "user-main" },
});
const __VLS_36 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    model: (__VLS_ctx.form),
}));
const __VLS_38 = __VLS_37({
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_40 } = __VLS_39.slots;
// @ts-ignore
[form,];
const __VLS_41 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
ElRow;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const { default: __VLS_45 } = __VLS_44.slots;
const __VLS_46 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_50 } = __VLS_49.slots;
/** @type {[typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.name),
    size: "large",
    placeholder: "姓名",
    icon: "user",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_52 = __VLS_51({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.name),
    size: "large",
    placeholder: "姓名",
    icon: "user",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[isEditing, form,];
var __VLS_49;
const __VLS_55 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
/** @type {[typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "电话号码",
    size: "large",
    icon: "telephone",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_61 = __VLS_60({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "电话号码",
    size: "large",
    icon: "telephone",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[isEditing, form,];
var __VLS_58;
var __VLS_44;
const __VLS_64 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
ElRow;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_68 } = __VLS_67.slots;
const __VLS_69 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_73 } = __VLS_72.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.age),
    placeholder: "年龄",
    size: "large",
    icon: "age",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_75 = __VLS_74({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.age),
    placeholder: "年龄",
    size: "large",
    icon: "age",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const { default: __VLS_77 } = __VLS_76.slots;
// @ts-ignore
[isEditing, form,];
{
    const { suffix: __VLS_78 } = __VLS_76.slots;
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "unit" },
    });
}
var __VLS_76;
var __VLS_72;
const __VLS_79 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({}));
const __VLS_81 = __VLS_80({}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_83 } = __VLS_82.slots;
/** @type {[typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.school),
    size: "large",
    placeholder: "学校",
    icon: "school",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_85 = __VLS_84({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.school),
    size: "large",
    placeholder: "学校",
    icon: "school",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
// @ts-ignore
[isEditing, form,];
var __VLS_82;
var __VLS_67;
const __VLS_88 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
ElRow;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({}));
const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const { default: __VLS_92 } = __VLS_91.slots;
const __VLS_93 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({}));
const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const { default: __VLS_97 } = __VLS_96.slots;
/** @type {[typeof MySelect, typeof MySelect, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(MySelect, new MySelect({
    ...{ class: "form-select" },
    modelValue: (__VLS_ctx.form.gender),
    size: "large",
    placeholder: "性别",
    icon: "gender",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_99 = __VLS_98({
    ...{ class: "form-select" },
    modelValue: (__VLS_ctx.form.gender),
    size: "large",
    placeholder: "性别",
    icon: "gender",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
const { default: __VLS_101 } = __VLS_100.slots;
// @ts-ignore
[isEditing, form,];
const __VLS_102 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    label: "男",
    value: "男",
}));
const __VLS_104 = __VLS_103({
    label: "男",
    value: "男",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const __VLS_107 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
ElOption;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
    label: "女",
    value: "女",
}));
const __VLS_109 = __VLS_108({
    label: "女",
    value: "女",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
var __VLS_100;
var __VLS_96;
const __VLS_112 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({}));
const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_116 } = __VLS_115.slots;
/** @type {[typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.parent),
    placeholder: "家长",
    size: "large",
    icon: "parent",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_118 = __VLS_117({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.parent),
    placeholder: "家长",
    size: "large",
    icon: "parent",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
// @ts-ignore
[isEditing, form,];
var __VLS_115;
var __VLS_91;
const __VLS_121 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
ElRow;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({}));
const __VLS_123 = __VLS_122({}, ...__VLS_functionalComponentArgsRest(__VLS_122));
const { default: __VLS_125 } = __VLS_124.slots;
const __VLS_126 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_130 } = __VLS_129.slots;
/** @type {[typeof MySelect, typeof MySelect, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(MySelect, new MySelect({
    ...{ class: "form-select" },
    modelValue: (__VLS_ctx.form.grade),
    size: "large",
    placeholder: "年级",
    icon: "grade",
    disabled: (!__VLS_ctx.isEditing),
}));
const __VLS_132 = __VLS_131({
    ...{ class: "form-select" },
    modelValue: (__VLS_ctx.form.grade),
    size: "large",
    placeholder: "年级",
    icon: "grade",
    disabled: (!__VLS_ctx.isEditing),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_134 } = __VLS_133.slots;
// @ts-ignore
[isEditing, form,];
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.userGrade))) {
    // @ts-ignore
    [userGrade,];
    const __VLS_135 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_137 = __VLS_136({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
}
var __VLS_133;
var __VLS_129;
var __VLS_124;
var __VLS_39;
if (__VLS_ctx.isEditing) {
    // @ts-ignore
    [isEditing,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bottom-btn" },
    });
    /** @type {[typeof MyButton, typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
        color: "transparent",
        icon: "blueRadius",
        ...{ style: {} },
    }));
    const __VLS_141 = __VLS_140({
        ...{ 'onClick': {} },
        color: "transparent",
        icon: "blueRadius",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_140));
    let __VLS_143;
    let __VLS_144;
    const __VLS_145 = ({ click: {} },
        { onClick: (__VLS_ctx.cancelEditing) });
    const { default: __VLS_146 } = __VLS_142.slots;
    // @ts-ignore
    [cancelEditing,];
    var __VLS_142;
    /** @type {[typeof MyButton, typeof MyButton, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(MyButton, new MyButton({
        ...{ 'onClick': {} },
    }));
    const __VLS_148 = __VLS_147({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    let __VLS_150;
    let __VLS_151;
    const __VLS_152 = ({ click: {} },
        { onClick: (__VLS_ctx.saveChanges) });
    const { default: __VLS_153 } = __VLS_149.slots;
    // @ts-ignore
    [saveChanges,];
    var __VLS_149;
}
var __VLS_21;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['user-aside']} */ ;
/** @type {__VLS_StyleScopedClasses['user-wrapped']} */ ;
/** @type {__VLS_StyleScopedClasses['waveLeft']} */ ;
/** @type {__VLS_StyleScopedClasses['waveRight']} */ ;
/** @type {__VLS_StyleScopedClasses['user-header']} */ ;
/** @type {__VLS_StyleScopedClasses['user-container']} */ ;
/** @type {__VLS_StyleScopedClasses['user-img']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['user-main']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElContainer: ElContainer,
            ElAside: ElAside,
            ElMain: ElMain,
            ElButton: ElButton,
            ElAvatar: ElAvatar,
            ElForm: ElForm,
            ElFormItem: ElFormItem,
            ElRow: ElRow,
            ElOption: ElOption,
            ArrowLeftBold: ArrowLeftBold,
            EditPen: EditPen,
            useUserStore: useUserStore,
            DefaultAvatar: DefaultAvatar,
            MyButton: MyButton,
            MyInput: MyInput,
            MySelect: MySelect,
            goBack: goBack,
            isEditing: isEditing,
            form: form,
            startEditing: startEditing,
            cancelEditing: cancelEditing,
            saveChanges: saveChanges,
            userGrade: userGrade,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
