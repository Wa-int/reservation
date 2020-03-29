(this["webpackJsonprestaurant-reservations"]=this["webpackJsonprestaurant-reservations"]||[]).push([[0],{139:function(e,t,a){e.exports=a(217)},144:function(e,t,a){},145:function(e,t,a){},148:function(e,t,a){},211:function(e,t,a){},217:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a.n(r),i=a(7),o=a.n(i),s=(a(144),a(223)),c=a(224),u=a(22),m=(a(145),a(80)),v=a.n(m),d=a(106),h=a(34),f=a(35),p=a(48),E=a(55),b=a(57),g=a(88),y=a(219),w=a(9),T=a.n(w),C=a(222),D=a(108),N=a(220),k=(a(148),a(135));!function(e){e.Reservations="reservations"}(n||(n={}));var L={setReservationList:function(e){return localStorage.setItem(n.Reservations,e)},getReservationList:function(){return localStorage.getItem(n.Reservations)||""},clearReservationList:function(){return localStorage.removeItem(n.Reservations)}},S=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,null,[{key:"saveReservations",value:function(e){return new Promise((function(t,a){if(e){var n=JSON.parse(L.getReservationList()||"[]");n.push(e);var r=JSON.stringify(n);t(L.setReservationList(r))}else a(new Error("Data could not be saved, please try again."))}))}},{key:"getReservationsByDate",value:function(e){return new Promise((function(t,a){if(e){var n=JSON.parse(L.getReservationList()||"[]"),r={allTable:0,reservationList:[]};if(Array.isArray(n)&&n.length>0){for(var l=n.filter((function(t){return t.arrivalDate===e})).reduce((function(e,t){var a="".concat(t.firstName.toUpperCase()," ").concat(t.lastName.toUpperCase());return e[a]=e[a]||[],e[a].push(t),e}),Object.create(null)),i=0,o=0,s=Object.entries(l);o<s.length;o++){var c=Object(k.a)(s[o],2),u=c[0],m=c[1],v={name:"",total:0,table:0,reservationListDetails:[]},d=m.reduce((function(e,t){return e+Number(t.total)}),0),h=0;h=Math.floor(d/4),i+=h=d%4>0?h+1:h,v.name=u,v.reservationListDetails=m,v.total=d,v.table=h,r.reservationList.push(v)}r.allTable=i,t(r)}else t(r)}else a(new Error("Unable to complete your request."))}))}}]),e}(),O=S,R=function(e){Object(b.a)(a,e);var t=Object(E.a)(a);function a(e){var n;Object(h.a)(this,a),(n=t.call(this,e)).timeFormat=void 0;var r=T()();return n.state={firstName:"",lastName:"",phone:"",arrivalDate:r,arrivalTime:r,departureTime:r,total:0,validated:!1},n.timeFormat="h:mm a",n._onSubmit=n._onSubmit.bind(Object(p.a)(n)),n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){}},{key:"handleOnChangeArrivalDate",value:function(e){e&&this.setState({arrivalDate:e})}},{key:"_onSubmit",value:function(){var e=Object(d.a)(v.a.mark((function e(){var t,a,n,r,l,i,o,s,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({validated:!0}),this.validateForm()){e.next=4;break}return e.abrupt("return");case 4:t=this.state,a=t.firstName,n=t.lastName,r=t.phone,l=t.arrivalDate,i=t.arrivalTime,o=t.departureTime,s=t.total,c={firstName:a,lastName:n,phone:r,arrivalDate:l.format("YYYY-MM-DD"),arrivalTime:i.format(this.timeFormat),departureTime:o.format(this.timeFormat),total:s},O.saveReservations(c).then((function(){window.location.reload(!1)})).catch((function(e){console.log(e)}));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleOnChangeTotal",value:function(e){var t=e.target.value;Number(t)<0||this.setState({total:t})}},{key:"handleOnChangePhoneNumber",value:function(e){var t=e.target.value;Number(t)<0||this.setState({phone:t})}},{key:"validateForm",value:function(){var e=this.state,t=e.firstName,a=e.lastName,n=e.total;return t.length>0&&a.length>0&&this.validateArrivalTime()&&this.validateDepartureTime()&&this.validateDay()&&this.validatePhone()&&n>0}},{key:"validateDepartureTime",value:function(){var e=this.state,t=e.arrivalTime,a=e.departureTime;return t.set({second:0,millisecond:0}),a.set({second:0,millisecond:0}),t.isBefore(a)}},{key:"validateArrivalTime",value:function(){var e=this.state,t=e.arrivalTime,a=e.arrivalDate,n=T()("".concat(a.format("YYYY-MM-DD")," ").concat(t.format("HH:mm"))),r=T()().set({second:0,millisecond:0});return n.isSameOrAfter(r)}},{key:"validatePhone",value:function(){var e=this.state.phone;return/^[0][1-9]\d{7}$|^[0][1-9]\d{8}$/.test(e)}},{key:"validateDay",value:function(){var e=this.state.arrivalDate;return T()().isSameOrBefore(e,"day")}},{key:"render",value:function(){var e=this,t=this.state,a=t.firstName,n=t.lastName,r=t.phone,i=t.arrivalDate,o=t.arrivalTime,s=t.departureTime,c=t.total,u=t.validated;return l.a.createElement(C.a,{validated:this.validateForm()},l.a.createElement("div",{className:"header-boundary"},l.a.createElement("h3",null,"Reservation Form"),l.a.createElement("h5",null,"Please fill the form below accurately to enable us serve you better!.. welcome!")),l.a.createElement("div",{className:"forms-body"},l.a.createElement(C.a.Row,null,l.a.createElement(C.a.Group,{as:D.a,controlId:"validationCustom01"},l.a.createElement(C.a.Label,null,"First name"),l.a.createElement(C.a.Control,{required:!0,type:"text",placeholder:"First name",value:a,onChange:function(t){e.setState({firstName:t.target.value})},isInvalid:0===a.length&&u}),l.a.createElement(C.a.Control.Feedback,{type:"invalid"},"First name is required")),l.a.createElement(C.a.Group,{as:D.a,controlId:"validationCustom02"},l.a.createElement(C.a.Label,null,"Last name"),l.a.createElement(C.a.Control,{required:!0,type:"text",placeholder:"Last name",value:n,onChange:function(t){e.setState({lastName:t.target.value})},isInvalid:0===n.length&&u}),l.a.createElement(C.a.Control.Feedback,{type:"invalid"},"Last name is required"))),l.a.createElement(C.a.Row,null,l.a.createElement(C.a.Group,{as:D.a,controlId:"validationCustom02"},l.a.createElement(C.a.Label,null,"Phone number"),l.a.createElement(C.a.Control,{required:!0,type:"number",placeholder:"Phone number",value:r,onChange:function(t){return e.handleOnChangePhoneNumber(t)},isInvalid:!this.validatePhone()&&u}),l.a.createElement(C.a.Control.Feedback,{type:"invalid"},"Phone number is not correct (0XXXXXXX)"))),l.a.createElement(C.a.Row,{className:"body-group"},l.a.createElement(C.a.Group,{as:D.a,md:"3",controlId:"validationCustom03"},l.a.createElement(C.a.Label,null,"Arrival Date"),l.a.createElement("div",{className:!this.validateDay()&&u?"time-input-warning":""},l.a.createElement(g.a,{defaultValue:i,onChange:function(t){return e.handleOnChangeArrivalDate(t)},allowClear:!1})),!this.validateDay()&&u&&l.a.createElement("div",{className:"custom-warning"},l.a.createElement(C.a.Text,null,"Cannot select in past dates"))),l.a.createElement(C.a.Group,{as:D.a,md:"3",controlId:"validationCustom04"},l.a.createElement(C.a.Label,null,"Arrival Time"),l.a.createElement("div",{className:!this.validateArrivalTime()&&u?"time-input-warning":""},l.a.createElement(y.a,{defaultValue:o,format:this.timeFormat,onChange:function(t){return t?e.setState({arrivalTime:t}):t},allowClear:!1})),!this.validateArrivalTime()&&u&&l.a.createElement("div",{className:"custom-warning"},l.a.createElement(C.a.Text,null,"Arrival Time cannot be less than Now"))),l.a.createElement(C.a.Group,{as:D.a,md:"3",controlId:"validationCustom05"},l.a.createElement(C.a.Label,null,"Departure Time"),l.a.createElement("div",{className:!this.validateDepartureTime()&&u?"time-input-warning":""},l.a.createElement(y.a,{defaultValue:s,format:this.timeFormat,onChange:function(t){return t?e.setState({departureTime:t}):t},allowClear:!1})),!this.validateDepartureTime()&&u&&l.a.createElement("div",{className:"custom-warning"},l.a.createElement(C.a.Text,null,"Departure Time must be more than Arrival Time")))),l.a.createElement(C.a.Row,null,l.a.createElement(C.a.Group,{as:D.a,controlId:"validationCustom02"},l.a.createElement(C.a.Label,null,"Total"),l.a.createElement(C.a.Control,{required:!0,type:"number",placeholder:"Total",value:c,onChange:function(t){e.handleOnChangeTotal(t)},isInvalid:0===c&&u}),l.a.createElement(C.a.Control.Feedback,{type:"invalid"},"Total is required"))),l.a.createElement("div",{className:"submit-button-container"},l.a.createElement(N.a,{type:"button",onClick:this._onSubmit},"Submit"))))}}]),a}(l.a.Component),A=a(221),F=(a(211),function(e){Object(b.a)(a,e);var t=Object(E.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={reservationList:[],selectedDate:T()(),summary:0},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getReservationList(this.state.selectedDate)}},{key:"getReservationList",value:function(e){var t=this;S.getReservationsByDate(e.format("YYYY-MM-DD")).then((function(e){t.setState({reservationList:e.reservationList,summary:e.allTable})})).catch((function(e){return console.log(e)}))}},{key:"renderTable",value:function(){var e=this.state,t=e.reservationList,a=e.summary,n=0;return l.a.createElement("div",{className:"table-style"},l.a.createElement(A.a,{responsive:"sm"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"No."),l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Arrival Time"),l.a.createElement("th",null,"Departure Time"),l.a.createElement("th",null,"Tel"),l.a.createElement("th",null,"Total/Reservation"),l.a.createElement("th",null,"Total"),l.a.createElement("th",null,"Table"))),l.a.createElement("tbody",null,t.map((function(e,t){var a=e.reservationListDetails.length;return l.a.createElement(l.a.Fragment,null,e.reservationListDetails.map((function(r,i){var o="".concat(t).concat(i,"-").concat(e.name,"-").concat(r.arrivalTime);return n+=1,l.a.createElement("tr",{key:o},l.a.createElement("td",null,n),0===i&&l.a.createElement("td",{rowSpan:a},e.name),l.a.createElement("td",null,r.arrivalTime),l.a.createElement("td",null,r.departureTime),l.a.createElement("td",null,r.phone),l.a.createElement("td",null,r.total),0===i&&l.a.createElement("td",{rowSpan:a},e.total),0===i&&l.a.createElement("td",{rowSpan:a},e.table))})))})))),l.a.createElement("div",{className:"summary-style "},"Summary: ".concat(a," Table(s)")))}},{key:"handleOnChangeArrivalDate",value:function(e){e&&(this.setState({selectedDate:e,reservationList:[]}),this.getReservationList(e))}},{key:"render",value:function(){var e=this,t=this.state,a=t.reservationList,n=t.selectedDate;return l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement(g.a,{defaultValue:n,onChange:function(t){return e.handleOnChangeArrivalDate(t)},allowClear:!1})),l.a.createElement("div",{className:"body-container"},n?a.length>0?this.renderTable():l.a.createElement("h5",null,"No reservations"):l.a.createElement("h5",null,"Select Date")))}}]),a}(l.a.Component));var j=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{bg:"dark",variant:"dark"},l.a.createElement(s.a.Brand,null,"Restaurant"),l.a.createElement(c.a,{className:"mr-auto"},l.a.createElement(c.a.Link,{href:"/reservations"},"Reservations"),l.a.createElement(c.a.Link,{href:"/report"},"Report"))),l.a.createElement("div",{className:"App"},l.a.createElement(u.c,null,l.a.createElement(u.a,{exact:!0,path:"/reservations",component:R}),l.a.createElement(u.a,{exact:!0,path:"/report",component:F}),l.a.createElement(u.a,{render:function(){return l.a.createElement("p",null,"Not found")}}))))},I=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Y=a(79),x=(a(214),a(215),a(216),function(){return l.a.createElement(Y.a,{basename:"/home"},l.a.createElement(j,null))});o.a.render(l.a.createElement(x,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/reservation",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/reservation","/service-worker.js");I?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):P(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):P(t,e)}))}}()}},[[139,1,2]]]);
//# sourceMappingURL=main.89b0da0f.chunk.js.map