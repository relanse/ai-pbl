import loginFormTemplate from '@/components/LoginFormTemplate.vue';
import { computed, ref } from 'vue';
import { ElForm, ElFormItem } from 'element-plus';
import MyInput from '@/components/common/MyInput.vue';
import MyButton from '@/components/common/MyButton.vue';
import router from '@/router/index';
const form = ref({
    telephone: '',
    verificationCode: ''
});
const countdown = ref(0);
const buttonText = computed(() => {
    return countdown.value > 0 ? `${countdown.value}s` : '获取验证码';
});
const getCode = () => {
    if (countdown.value > 0)
        return;
    // 发送验证码逻辑
    console.log('发送验证码');
    // 开始倒计时
    countdown.value = 60;
    const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};
const handleToRest = () => {
    router.push('/password-find/rest');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['get-code-button']} */ ;
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
    placeholder: "请输入手机号码",
    size: "large",
    icon: "mobilephone",
}));
const __VLS_16 = __VLS_15({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.telephone),
    placeholder: "请输入手机号码",
    size: "large",
    icon: "mobilephone",
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
    modelValue: (__VLS_ctx.form.verificationCode),
    placeholder: "请输入验证码",
    size: "large",
    icon: "solidLock",
}));
const __VLS_25 = __VLS_24({
    ...{ class: "form-input" },
    modelValue: (__VLS_ctx.form.verificationCode),
    placeholder: "请输入验证码",
    size: "large",
    icon: "solidLock",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_27 } = __VLS_26.slots;
// @ts-ignore
[form,];
{
    const { suffix: __VLS_28 } = __VLS_26.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (__VLS_ctx.getCode) },
        ...{ class: "get-code-button" },
        ...{ class: ({ disabled: __VLS_ctx.countdown > 0 }) },
    });
    // @ts-ignore
    [getCode, countdown,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "get-code-button-line" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.buttonText);
    // @ts-ignore
    [buttonText,];
}
var __VLS_26;
var __VLS_22;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-btn" },
});
/** @type {[typeof MyButton, typeof MyButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(MyButton, new MyButton({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
const __VLS_34 = ({ click: {} },
    { onClick: (__VLS_ctx.handleToRest) });
const { default: __VLS_35 } = __VLS_31.slots;
// @ts-ignore
[handleToRest,];
var __VLS_31;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['get-code-button']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['get-code-button-line']} */ ;
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
            countdown: countdown,
            buttonText: buttonText,
            getCode: getCode,
            handleToRest: handleToRest,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
