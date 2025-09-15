import loginFormTemplate from '@/components/LoginFormTemplate.vue';
import { ref } from 'vue';
import router from '@/router/index';
import { ElForm, ElFormItem } from 'element-plus';
import MyInput from '@/components/common/MyInput.vue';
import MyButton from '@/components/common/MyButton.vue';
import MySelect from '@/components/common/MySelect.vue';
import { Grade } from '@/types/user';
const form = ref({
    name: '',
    age: undefined,
    gender: undefined,
    telephone: undefined,
    grade: undefined,
    school: '',
    parent: ''
});
const handleRestForm = () => {
    router.push('/login');
};
const genderOpt = [
    {
        value: '男',
        label: '男'
    },
    {
        value: '女',
        label: '女'
    }
];
const gradeOpt = [
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
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof loginFormTemplate, typeof loginFormTemplate, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(loginFormTemplate, new loginFormTemplate({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
const { default: __VLS_4 } = __VLS_2.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form" },
});
const __VLS_5 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.form),
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
// @ts-ignore
[form,];
const __VLS_10 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.name),
    placeholder: "请输入姓名",
    size: "large",
    type: "password",
    icon: "lock",
}));
const __VLS_16 = __VLS_15({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.name),
    placeholder: "请输入姓名",
    size: "large",
    type: "password",
    icon: "lock",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[form,];
var __VLS_13;
const __VLS_19 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_23 } = __VLS_22.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.age),
    placeholder: "请输入年龄",
    size: "large",
    type: "text",
    icon: "age",
}));
const __VLS_25 = __VLS_24({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.age),
    placeholder: "请输入年龄",
    size: "large",
    type: "text",
    icon: "age",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[form,];
var __VLS_22;
const __VLS_28 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_32 } = __VLS_31.slots;
/** @type {[typeof MySelect, typeof MySelect, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(MySelect, new MySelect({
    modelValue: (__VLS_ctx.form.gender),
    options: (__VLS_ctx.genderOpt),
    placeholder: "请选择性别",
    size: "large",
    icon: "gender",
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.form.gender),
    options: (__VLS_ctx.genderOpt),
    placeholder: "请选择性别",
    size: "large",
    icon: "gender",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
// @ts-ignore
[form, genderOpt,];
var __VLS_31;
const __VLS_37 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_41 } = __VLS_40.slots;
/** @type {[typeof MySelect, typeof MySelect, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(MySelect, new MySelect({
    modelValue: (__VLS_ctx.form.grade),
    options: (__VLS_ctx.gradeOpt),
    placeholder: "请选择年级",
    size: "large",
    icon: "grade",
}));
const __VLS_43 = __VLS_42({
    modelValue: (__VLS_ctx.form.grade),
    options: (__VLS_ctx.gradeOpt),
    placeholder: "请选择年级",
    size: "large",
    icon: "grade",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
// @ts-ignore
[form, gradeOpt,];
var __VLS_40;
const __VLS_46 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_50 } = __VLS_49.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "请输入手机号码",
    size: "large",
    icon: "telephone",
}));
const __VLS_52 = __VLS_51({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "请输入手机号码",
    size: "large",
    icon: "telephone",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[form,];
var __VLS_49;
const __VLS_55 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.school),
    placeholder: "请输入学校",
    size: "large",
    icon: "school",
}));
const __VLS_61 = __VLS_60({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.school),
    placeholder: "请输入学校",
    size: "large",
    icon: "school",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[form,];
var __VLS_58;
const __VLS_64 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_68 } = __VLS_67.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.parent),
    placeholder: "请输入家长姓名",
    size: "large",
    icon: "parent",
}));
const __VLS_70 = __VLS_69({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.parent),
    placeholder: "请输入家长姓名",
    size: "large",
    icon: "parent",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
// @ts-ignore
[form,];
var __VLS_67;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-btn" },
});
/** @type {[typeof MyButton, typeof MyButton, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(MyButton, new MyButton({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
const __VLS_78 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRestForm) });
const { default: __VLS_79 } = __VLS_75.slots;
// @ts-ignore
[handleRestForm,];
var __VLS_75;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            loginFormTemplate: loginFormTemplate,
            ElForm: ElForm,
            ElFormItem: ElFormItem,
            MyInput: MyInput,
            MyButton: MyButton,
            MySelect: MySelect,
            form: form,
            handleRestForm: handleRestForm,
            genderOpt: genderOpt,
            gradeOpt: gradeOpt,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
