import Cover from '@aipbl/common/assets/Cover.png';
import LogoImg from '@aipbl/common/assets/Logo.png';
import { ElForm, ElFormItem, ElCheckbox } from 'element-plus';
import { ref } from 'vue';
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
defineOptions({
    name: 'LoginPage'
});
const form = ref({
    account: '',
    password: '',
    agreement: false
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cover']} */ ;
/** @type {__VLS_StyleScopedClasses['login-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-title']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-title']} */ ;
/** @type {__VLS_StyleScopedClasses['password-forget']} */ ;
/** @type {__VLS_StyleScopedClasses['form-agreement']} */ ;
/** @type {__VLS_StyleScopedClasses['agreement-link']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page-wrapper" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "common-container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "cover" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.Cover),
    alt: "Cover",
});
// @ts-ignore
[Cover,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "login" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "login-logo" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.LogoImg),
    alt: "Logo",
});
// @ts-ignore
[LogoImg,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "logo-title" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "login-form" },
});
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.form),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[form,];
const __VLS_5 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.account),
    placeholder: "请输入账号",
    size: "large",
    icon: "user",
}));
const __VLS_11 = __VLS_10({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.account),
    placeholder: "请输入账号",
    size: "large",
    icon: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
// @ts-ignore
[form,];
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "password-container" },
});
const __VLS_14 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_18 } = __VLS_17.slots;
/** @type {[typeof MyInput, typeof MyInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(MyInput, new MyInput({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.password),
    placeholder: "请输入密码",
    size: "large",
    type: "password",
    icon: "solidLock",
    showPassword: (true),
}));
const __VLS_20 = __VLS_19({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.password),
    placeholder: "请输入密码",
    size: "large",
    type: "password",
    icon: "solidLock",
    showPassword: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
// @ts-ignore
[form,];
var __VLS_17;
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/password-find",
    ...{ class: "password-forget" },
});
const __VLS_23 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_27 } = __VLS_26.slots;
/** @type {[typeof MyButton, typeof MyButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(MyButton, new MyButton({
    ...{ class: "form-btn" },
}));
const __VLS_29 = __VLS_28({
    ...{ class: "form-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_31 } = __VLS_30.slots;
var __VLS_30;
var __VLS_26;
const __VLS_32 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ class: "form-agreement" },
}));
const __VLS_34 = __VLS_33({
    ...{ class: "form-agreement" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_36 } = __VLS_35.slots;
const __VLS_37 = {}.ElCheckbox;
/** @type {[typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, ]} */ ;
// @ts-ignore
ElCheckbox;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    modelValue: (__VLS_ctx.form.agreement),
}));
const __VLS_39 = __VLS_38({
    modelValue: (__VLS_ctx.form.agreement),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const { default: __VLS_41 } = __VLS_40.slots;
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "agreement-text" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "#",
    ...{ class: "agreement-link" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "agreement-text" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "#",
    ...{ class: "agreement-link" },
});
var __VLS_40;
var __VLS_35;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['page-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['common-container']} */ ;
/** @type {__VLS_StyleScopedClasses['cover']} */ ;
/** @type {__VLS_StyleScopedClasses['login']} */ ;
/** @type {__VLS_StyleScopedClasses['login-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-title']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['password-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['password-forget']} */ ;
/** @type {__VLS_StyleScopedClasses['form-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['form-agreement']} */ ;
/** @type {__VLS_StyleScopedClasses['agreement-text']} */ ;
/** @type {__VLS_StyleScopedClasses['agreement-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agreement-text']} */ ;
/** @type {__VLS_StyleScopedClasses['agreement-link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Cover: Cover,
            LogoImg: LogoImg,
            ElForm: ElForm,
            ElFormItem: ElFormItem,
            ElCheckbox: ElCheckbox,
            MyButton: MyButton,
            MyInput: MyInput,
            form: form,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
