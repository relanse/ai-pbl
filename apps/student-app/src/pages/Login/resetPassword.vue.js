import loginFormTemplate from '@/components/LoginFormTemplate.vue';
import { ref } from 'vue';
import router from '@/router/index';
import { ElForm, ElFormItem } from 'element-plus';
import MyInput from '@/components/common/MyInput.vue';
import MyButton from '@/components/common/MyButton.vue';
const form = ref({
    telephone: '',
    password: ''
});
const handleRestForm = () => {
    router.push('/login');
};
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
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "请输入密码",
    size: "large",
    type: "password",
    icon: "lock",
}));
const __VLS_16 = __VLS_15({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "请输入密码",
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
    modelValue: (__VLS_ctx.form.password),
    placeholder: "请重新输入密码",
    size: "large",
    type: "password",
    icon: "unlock",
}));
const __VLS_25 = __VLS_24({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.password),
    placeholder: "请重新输入密码",
    size: "large",
    type: "password",
    icon: "unlock",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
// @ts-ignore
[form,];
var __VLS_22;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-btn" },
});
/** @type {[typeof MyButton, typeof MyButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(MyButton, new MyButton({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_29 = __VLS_28({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
const __VLS_33 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRestForm) });
const { default: __VLS_34 } = __VLS_30.slots;
// @ts-ignore
[handleRestForm,];
var __VLS_30;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
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
            form: form,
            handleRestForm: handleRestForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
