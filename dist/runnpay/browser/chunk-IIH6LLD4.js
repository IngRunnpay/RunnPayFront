import{Ka as z,W as C,ka as b,pa as u,sa as f}from"./chunk-PCQKHSJI.js";import{Ac as $,K as r,L as l,Na as I,Ob as d,Q as s,Ta as h,Ua as a,Va as M,Xa as p,_ as o,dc as D,gb as c,ib as x,vb as F,xb as v,yb as y}from"./chunk-XAYFPFYS.js";var P=["*"],E=({dt:e})=>`
.p-iconfield {
    position: relative;
    display: block;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (${e("icon.size")} / 2));
    color: ${e("iconfield.icon.color")};
    line-height: 1;
}

.p-iconfield .p-inputicon:first-child {
    inset-inline-start: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputicon:last-child {
    inset-inline-end: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputtext:not(:first-child) {
    padding-inline-start: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-inline-end: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
    font-size: ${e("form.field.sm.font.size")};
    width: ${e("form.field.sm.font.size")};
    height: ${e("form.field.sm.font.size")};
    margin-top: calc(-1 * (${e("form.field.sm.font.size")} / 2));
}

.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
    font-size: ${e("form.field.lg.font.size")};
    width: ${e("form.field.lg.font.size")};
    height: ${e("form.field.lg.font.size")};
    margin-top: calc(-1 * (${e("form.field.lg.font.size")} / 2));
}
`,H={root:"p-iconfield"},S=(()=>{class e extends u{name="iconfield";theme=E;classes=H;static \u0275fac=(()=>{let i;return function(t){return(i||(i=o(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})();var V=(()=>{class e extends f{iconPosition="left";get _styleClass(){return this.styleClass}styleClass;_componentStyle=s(S);static \u0275fac=(()=>{let i;return function(t){return(i||(i=o(e)))(t||e)}})();static \u0275cmp=h({type:e,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostAttrs:[1,"p-iconfield"],hostVars:6,hostBindings:function(n,t){n&2&&(x(t._styleClass),c("p-iconfield-left",t.iconPosition==="left")("p-iconfield-right",t.iconPosition==="right"))},inputs:{iconPosition:"iconPosition",styleClass:"styleClass"},features:[d([S]),p],ngContentSelectors:P,decls:1,vars:0,template:function(n,t){n&1&&(v(),y(0))},dependencies:[$],encapsulation:2,changeDetection:0})}return e})(),Z=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=a({type:e});static \u0275inj=l({imports:[V]})}return e})();var N=["*"],T={root:"p-inputicon"},B=(()=>{class e extends u{name="inputicon";classes=T;static \u0275fac=(()=>{let i;return function(t){return(i||(i=o(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})(),A=(()=>{class e extends f{styleClass;get hostClasses(){return this.styleClass}_componentStyle=s(B);static \u0275fac=(()=>{let i;return function(t){return(i||(i=o(e)))(t||e)}})();static \u0275cmp=h({type:e,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:4,hostBindings:function(n,t){n&2&&(x(t.hostClasses),c("p-inputicon",!0))},inputs:{styleClass:"styleClass"},features:[d([B]),p],ngContentSelectors:N,decls:1,vars:0,template:function(n,t){n&1&&(v(),y(0))},dependencies:[$,b],encapsulation:2,changeDetection:0})}return e})(),fe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=a({type:e});static \u0275inj=l({imports:[A,b,b]})}return e})();var _=({dt:e})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${e("inputtext.color")};
    background: ${e("inputtext.background")};
    padding-block: ${e("inputtext.padding.y")};
    padding-inline: ${e("inputtext.padding.x")};
    border: 1px solid ${e("inputtext.border.color")};
    transition: background ${e("inputtext.transition.duration")}, color ${e("inputtext.transition.duration")}, border-color ${e("inputtext.transition.duration")}, outline-color ${e("inputtext.transition.duration")}, box-shadow ${e("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${e("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${e("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${e("inputtext.focus.border.color")};
    box-shadow: ${e("inputtext.focus.ring.shadow")};
    outline: ${e("inputtext.focus.ring.width")} ${e("inputtext.focus.ring.style")} ${e("inputtext.focus.ring.color")};
    outline-offset: ${e("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${e("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${e("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${e("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${e("inputtext.disabled.background")};
    color: ${e("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${e("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${e("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${e("inputtext.sm.font.size")};
    padding-block: ${e("inputtext.sm.padding.y")};
    padding-inline: ${e("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${e("inputtext.lg.font.size")};
    padding-block: ${e("inputtext.lg.padding.y")};
    padding-inline: ${e("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,L={root:({instance:e,props:g})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":g.size==="small","p-inputtext-lg":g.size==="large","p-invalid":g.invalid,"p-variant-filled":g.variant==="filled","p-inputtext-fluid":g.fluid}]},k=(()=>{class e extends u{name="inputtext";theme=_;classes=L;static \u0275fac=(()=>{let i;return function(t){return(i||(i=o(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})();var Ce=(()=>{class e extends f{ngModel;variant;fluid;pSize;filled;_componentStyle=s(k);get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return C(this.fluid)?!!n:this.fluid}constructor(i){super(),this.ngModel=i}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(n){return new(n||e)(I(z,8))};static \u0275dir=M({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(n,t){if(n&1&&F("input",function(w){return t.onInput(w)}),n&2){let m;c("p-filled",t.filled)("p-variant-filled",((m=t.variant)!==null&&m!==void 0?m:t.config.inputStyle()||t.config.inputVariant())==="filled")("p-inputtext-fluid",t.hasFluid)("p-inputtext-sm",t.pSize==="small")("p-inputfield-sm",t.pSize==="small")("p-inputtext-lg",t.pSize==="large")("p-inputfield-lg",t.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",D],pSize:"pSize"},features:[d([k]),p]})}return e})(),ze=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=a({type:e});static \u0275inj=l({})}return e})();export{V as a,Z as b,A as c,fe as d,Ce as e,ze as f};
