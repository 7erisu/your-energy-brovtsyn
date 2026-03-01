(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const W="https://your-energy.b.goit.study/api";class X{constructor(t){this.baseUrl=t}async request(t,n={}){const r=this.baseUrl+t,a=await fetch(r,{headers:{"Content-Type":"application/json",...n.headers},...n});if(!a.ok)throw await this.handleError(a);return a.status===204?null:a.json()}async handleError(t){let n=`HTTP ${t.status}`;try{const a=await t.json();a!=null&&a.message&&(n=a.message)}catch{}const r=new Error(n);return r.status=t.status,r}get(t,n={}){const r=new URLSearchParams(n).toString(),a=r?`${t}?${r}`:t;return this.request(a)}post(t,n){return this.request(t,{method:"POST",body:JSON.stringify(n)})}patch(t,n){return this.request(t,{method:"PATCH",body:JSON.stringify(n)})}}const b=new X(W);function ee(){return b.get("/quote")}function te(e,t=1,n=12){return b.get("/filters",{filter:e,page:t,limit:n})}function ne(e={}){return b.get("/exercises",e)}function ae(e){return b.get(`/exercises/${e}`)}function re(e,t){return b.patch(`/exercises/${e}/rating`,t)}function ie(e){return b.post("/subscription",{email:e})}const D="dailyQuote";let y={quoteEl:null,authorEl:null};function oe(){if(y.quoteEl=document.querySelector(".quote-card-quote"),y.authorEl=document.querySelector(".quote-card-author"),!y.quoteEl||!y.authorEl)return;const e=ce();if(e){O(e);return}se()}async function se(){try{const e=await ee(),t={quote:e.quote,author:e.author};O(t),le(t)}catch{}}function O({quote:e,author:t}){y.quoteEl.textContent=e,y.authorEl.textContent=t}function ce(){try{const e=localStorage.getItem(D);if(!e)return null;const t=JSON.parse(e);return de(t.date)?{quote:t.quote,author:t.author}:null}catch{return null}}function le({quote:e,author:t}){try{localStorage.setItem(D,JSON.stringify({quote:e,author:t,date:I()}))}catch{}}function I(){return new Date().toDateString()}function de(e){return e===I()}const ue="data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016.5%2018.1667'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20d='M11.5833%204.08333V3.41667C11.5833%202.48325%2011.5833%202.01654%2011.4017%201.66002C11.2419%201.34641%2010.9869%201.09145%2010.6733%200.931657C10.3168%200.750001%209.85009%200.750001%208.91667%200.750001H7.58333C6.64991%200.750001%206.1832%200.750001%205.82668%200.931657C5.51308%201.09145%205.25811%201.34641%205.09832%201.66002C4.91667%202.01654%204.91667%202.48325%204.91667%203.41667V4.08333M6.58333%208.66667V12.8333M9.91667%208.66667V12.8333M0.75%204.08333H15.75M14.0833%204.08333V13.4167C14.0833%2014.8168%2014.0833%2015.5169%2013.8108%2016.0516C13.5712%2016.5221%2013.1887%2016.9045%2012.7183%2017.1442C12.1835%2017.4167%2011.4835%2017.4167%2010.0833%2017.4167H6.41667C5.01654%2017.4167%204.31647%2017.4167%203.78169%2017.1442C3.31129%2016.9045%202.92883%2016.5221%202.68915%2016.0516C2.41667%2015.5169%202.41667%2014.8168%202.41667%2013.4167V4.08333'%20stroke='var(--stroke-0,%20%23242424)'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",ge="data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2012.9675%2012.4316'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Star%201'%20d='M5.53268%200.690983C5.83204%20-0.230327%207.13545%20-0.230328%207.4348%200.690983L8.27985%203.2918C8.41373%203.70382%208.79768%203.98278%209.23091%203.98278H11.9656C12.9343%203.98278%2013.3371%205.22239%2012.5534%205.7918L10.341%207.39919C9.99048%207.65383%209.84382%208.1052%209.9777%208.51722L10.8228%2011.118C11.1221%2012.0393%2010.0676%2012.8055%209.28391%2012.2361L7.07153%2010.6287C6.72104%2010.374%206.24644%2010.374%205.89596%2010.6287L3.68357%2012.2361C2.89986%2012.8055%201.84538%2012.0393%202.14473%2011.118L2.98978%208.51722C3.12366%208.1052%202.977%207.65383%202.62651%207.39919L0.414132%205.7918C-0.369582%205.2224%200.0331929%203.98278%201.00192%203.98278H3.73657C4.1698%203.98278%204.55375%203.70382%204.68763%203.2918L5.53268%200.690983Z'%20fill='var(--fill-0,%20%23EEA10C)'/%3e%3c/svg%3e",fe="data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2012.9675%2012.4316'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Star%205'%20d='M5.53268%200.690983C5.83204%20-0.230327%207.13545%20-0.230328%207.4348%200.690983L8.27985%203.2918C8.41373%203.70382%208.79768%203.98278%209.23091%203.98278H11.9656C12.9343%203.98278%2013.3371%205.22239%2012.5534%205.7918L10.341%207.39919C9.99048%207.65383%209.84382%208.1052%209.9777%208.51722L10.8228%2011.118C11.1221%2012.0393%2010.0676%2012.8055%209.28391%2012.2361L7.07153%2010.6287C6.72104%2010.374%206.24644%2010.374%205.89596%2010.6287L3.68357%2012.2361C2.89986%2012.8055%201.84538%2012.0393%202.14473%2011.118L2.98978%208.51722C3.12366%208.1052%202.977%207.65383%202.62651%207.39919L0.414132%205.7918C-0.369582%205.2224%200.0331929%203.98278%201.00192%203.98278H3.73657C4.1698%203.98278%204.55375%203.70382%204.68763%203.2918L5.53268%200.690983Z'%20fill='var(--fill-0,%20%23F4F4F4)'%20fill-opacity='0.2'/%3e%3c/svg%3e",pe="data:image/svg+xml,%3csvg%20width='15'%20height='15'%20viewBox='0%200%2015%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.1499%2013.6499L13.6499%207.1499M13.6499%207.1499L7.1499%200.649902M13.6499%207.1499H0.649902'%20stroke='%23242424'%20stroke-width='1.3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",me="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='16'%20cy='16'%20r='16'%20fill='%23F4F4F4'%20fill-opacity='0.2'/%3e%3cpath%20d='M24.7293%2011.907C24.4611%2011.594%2023.9834%2011.5528%2023.6631%2011.8138L21.5637%2013.5369L20.5983%2011.1998C20.564%2011.1121%2020.5119%2011.0384%2020.452%2010.9734C20.2547%2010.5446%2019.9122%2010.1763%2019.44%209.96297C19.235%209.872%2019.0233%209.82326%2018.8116%209.79944C18.765%209.77561%2018.7229%209.7442%2018.6697%209.72796L14.9754%208.72184C14.7681%208.6666%2014.5597%208.70234%2014.3891%208.79981C14.1862%208.86696%2014.0122%209.011%2013.9291%209.22002L12.538%2012.7149C12.3873%2013.0951%2012.5801%2013.5239%2012.9703%2013.6734C13.3582%2013.8207%2013.7983%2013.6311%2013.9501%2013.2499L15.125%2010.2987L16.8076%2010.7557C16.7666%2010.8207%2016.7222%2010.8814%2016.689%2010.9507L14.532%2015.5188C14.501%2015.586%2014.4844%2015.6542%2014.4622%2015.7235L11.8408%2020.0177L7.45378%2021.4516C6.95721%2021.8144%206.85192%2022.4978%207.2188%2022.983C7.5879%2023.4692%208.28951%2023.5721%208.78497%2023.2137L13.274%2021.7029C13.4114%2021.6054%2013.5112%2021.4776%2013.5866%2021.34C13.6431%2021.2816%2013.7074%2021.235%2013.7506%2021.1624L15.3135%2018.6022L18.0878%2020.9123L15.1195%2024.1808C14.7105%2024.6313%2014.7515%2025.3255%2015.2148%2025.7241C15.677%2026.1259%2016.3853%2026.0836%2016.7965%2025.6309L20.5008%2021.5534C20.6161%2021.4278%2020.6848%2021.2826%2020.7313%2021.131C20.759%2021.0487%2020.759%2020.9632%2020.7657%2020.8776C20.7657%2020.8343%2020.7823%2020.7953%2020.779%2020.7552C20.769%2020.4563%2020.6449%2020.1661%2020.3944%2019.9592L17.8417%2017.8322C18.0257%2017.661%2018.182%2017.4574%2018.2951%2017.2181L19.9488%2013.7189L20.4786%2015.0975C20.5008%2015.2199%2020.5429%2015.3401%2020.6316%2015.4409C20.7114%2015.534%2020.8134%2015.5957%2020.922%2015.6391C20.9331%2015.6445%2020.9464%2015.6456%2020.9597%2015.6488C21.0284%2015.6726%2021.0982%2015.6954%2021.1703%2015.6986C21.2556%2015.7062%2021.3421%2015.6954%2021.4296%2015.6715C21.4318%2015.6705%2021.4329%2015.6705%2021.4329%2015.6705C21.4562%2015.665%2021.4795%2015.6694%2021.5028%2015.6596C21.6258%2015.6141%2021.72%2015.5372%2021.8009%2015.4474L24.8136%2012.9488C25.1339%2012.6857%2024.9987%2012.22%2024.7293%2011.907Z'%20fill='%23F4F4F4'/%3e%3cpath%20d='M20.9191%2010.1263C22.0853%2010.1263%2023.0306%209.20259%2023.0306%208.06314C23.0306%206.9237%2022.0853%206%2020.9191%206C19.753%206%2018.8076%206.9237%2018.8076%208.06314C18.8076%209.20259%2019.753%2010.1263%2020.9191%2010.1263Z'%20fill='%23F4F4F4'/%3e%3c/svg%3e",he="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%206L6%2018M6%206L18%2018'%20stroke='%23F4F4F4'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",ve="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.3671%203.84172C16.9415%203.41589%2016.4361%203.0781%2015.8799%202.84763C15.3237%202.61716%2014.7275%202.49854%2014.1254%202.49854C13.5234%202.49854%2012.9272%202.61716%2012.371%202.84763C11.8147%203.0781%2011.3094%203.41589%2010.8838%203.84172L10.0004%204.72506L9.11709%203.84172C8.25735%202.98198%207.09128%202.49898%205.87542%202.49898C4.65956%202.49898%203.4935%202.98198%202.63376%203.84172C1.77401%204.70147%201.29102%205.86753%201.29102%207.08339C1.29102%208.29925%201.77401%209.46531%202.63376%2010.3251L3.51709%2011.2084L10.0004%2017.6917L16.4838%2011.2084L17.3671%2010.3251C17.7929%209.89943%2018.1307%209.39407%2018.3612%208.83785C18.5917%208.28164%2018.7103%207.68546%2018.7103%207.08339C18.7103%206.48132%2018.5917%205.88514%2018.3612%205.32893C18.1307%204.77271%2017.7929%204.26735%2017.3671%203.84172Z'%20stroke='%23242424'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",we="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.3671%203.84172C16.9415%203.41589%2016.4361%203.0781%2015.8799%202.84763C15.3237%202.61716%2014.7275%202.49854%2014.1254%202.49854C13.5234%202.49854%2012.9272%202.61716%2012.371%202.84763C11.8147%203.0781%2011.3094%203.41589%2010.8838%203.84172L10.0004%204.72506L9.11709%203.84172C8.25735%202.98198%207.09128%202.49898%205.87542%202.49898C4.65956%202.49898%203.4935%202.98198%202.63376%203.84172C1.77401%204.70147%201.29102%205.86753%201.29102%207.08339C1.29102%208.29925%201.77401%209.46531%202.63376%2010.3251L3.51709%2011.2084L10.0004%2017.6917L16.4838%2011.2084L17.3671%2010.3251C17.7929%209.89943%2018.1307%209.39407%2018.3612%208.83785C18.5917%208.28164%2018.7103%207.68546%2018.7103%207.08339C18.7103%206.48132%2018.5917%205.88514%2018.3612%205.32893C18.1307%204.77271%2017.7929%204.26735%2017.3671%203.84172Z'%20fill='%23242424'%20stroke='%23242424'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",ye="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.5%2015L7.5%2010L12.5%205'%20stroke='%23242424'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",be="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.5%2015L7.5%2010L12.5%205'%20stroke='%23d4d4d4'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",ke="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2015L5%2010L10%205'%20stroke='%23242424'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%2015L10%2010L15%205'%20stroke='%23242424'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",Le="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2015L5%2010L10%205'%20stroke='%23d4d4d4'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%2015L10%2010L15%205'%20stroke='%23d4d4d4'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",d={trash:ue,starOrange:ge,starGrey:fe,arrowRight:pe,runningManLight:me,xLight:he,heartDark:ve,heartFilledDark:we,chevronLeftDark:ye,chevronLeftLight:be,chevronDoubleLeftDark:ke,chevronDoubleLeftLight:Le};function h(e,t=""){return e??t}function R(e){return typeof e=="number"?e.toFixed(1):"0.0"}function Ce(e=0){const t=Math.round(e||0);return Array.from({length:5},(n,r)=>`<img src="${r<t?d.starOrange:d.starGrey}" alt="" width="14" height="14" />`).join("")}function Ee({name:e,filter:t,imgURL:n}){return`
<li class="exercise-card" data-name="${h(e)}" data-filter="${h(t)}">
  <a class="exercise-card-link" href="#">
    <img
      src="${h(n)}"
      alt="${h(e)}"
      class="exercise-card-img"
      loading="lazy"
    />
    <div class="exercise-card-overlay">
      <p class="exercise-card-name">${h(e)}</p>
      <p class="exercise-card-subtitle">${h(t)}</p>
    </div>
  </a>
</li>`}function B(e,t={}){const{showTrash:n=!1}=t,r=R(e.rating),a=n?`
<button
  class="workout-card-trash"
  type="button"
  aria-label="Remove from favorites"
  data-remove-id="${e._id}"
>
  <img src="${d.trash}" alt="" width="16" height="16" />
</button>`:"";return`
<li class="workout-card" data-exercise-id="${e._id}">

  <div class="workout-card-top">

    <span class="workout-card-badge">
      WORKOUT
    </span>

    <span class="workout-card-rating">
      ${r}
      <img src="${d.starOrange}" alt="rating" />
    </span>

    ${a}

    <button
      class="workout-card-start"
      type="button"
      data-start-id="${e._id}"
    >
      Start
      <img src="${d.arrowRight}" alt="" />
    </button>

  </div>

  <div class="workout-card-body">

    <div class="workout-card-icon">

      <img
        src="${d.runningManLight}"
        alt=""
        width="24"
        height="24"
      />

    </div>

    <h3 class="workout-card-name">
      ${h(e.name)}
    </h3>

  </div>

  <div class="workout-card-meta">

    <span>
      Burned calories:
      <strong>
        ${h(e.burnedCalories)} /
        ${h(e.time)} min
      </strong>
    </span>

    <span>
      Body part:
      <strong>
        ${h(e.bodyPart)}
      </strong>
    </span>

    <span>
      Target:
      <strong>
        ${h(e.target)}
      </strong>
    </span>

  </div>

</li>`}function xe(e,t=!1){const n=R(e.rating),r=t?"Remove":"Add to favorites",a=t?d.heartFilledDark:d.heartDark;return`
<div class="modal-exercise-content">

<button
  class="modal-close"
  type="button"
  aria-label="Close"
  data-modal-close
>
  <img
    class="modal-close-icon"
    src="${d.xLight}"
    alt=""
    width="24"
    height="24"
  />
</button>

<div class="modal-exercise-gif">

  <img
    src="${h(e.gifUrl)}"
    alt="${h(e.name)}"
  />

</div>

<div class="modal-exercise-info">


<h3 class="modal-exercise-title">
${h(e.name)}
</h3>

<div class="modal-exercise-rating">

<span class="modal-exercise-rating-value">
${n}
</span>


<div class="modal-exercise-stars">
${Ce(e.rating)}
</div>
</div>
<div class="modal-exercise-details">

${k("Target",e.target)}

${k("Body Part",e.bodyPart)}

${k("Equipment",e.equipment)}

${k("Popular",e.popularity)}

${k("Burned calories",`${e.burnedCalories}/${e.time} min`)}

</div>

<p class="modal-exercise-desc">
${h(e.description)}
</p>

<div class="modal-exercise-actions">

<button
  class="modal-btn modal-btn-fav"
  type="button"
  data-fav-id="${e._id}"
>

<span>${r}</span>

<img
  src="${a}"
  alt=""
  width="18"
  height="18"
/>

</button>

<button
  class="modal-btn modal-btn-rating"
  type="button"
  data-rating-id="${e._id}"
>
Give a rating
</button>
</div>
</div>
</div>`}function k(e,t){return`
<div class="modal-exercise-detail-item">

<span class="modal-exercise-detail-label">
${e}
</span>

<span class="modal-exercise-detail-value">
${h(t)}
</span>

</div>`}function Se(e){const t=Array.from({length:5},(n,r)=>{const a=r+1;return`
<img
class="modal-star"
src="${d.starGrey}"
alt="${a} star"
width="24"
height="24"
data-star="${a}"
/>`}).join("");return`
<div class="modal-rating-content">


<button
class="modal-close"
type="button"
aria-label="Close"
data-modal-close
>
<img
src="${d.xLight}"
alt=""
width="28"
height="28"
/>
</button>
<p class="modal-rating-label">
Rating
</p>
<div class="modal-rating-row">
<span class="modal-rating-value">
0.0
</span>
<div class="modal-rating-stars">
${t}
</div>
</div>
<form
class="modal-rating-form"
data-exercise-id="${e}"
>
<input
class="modal-rating-email"
type="email"
name="email"
placeholder="Email"
required
/>
<textarea
class="modal-rating-comment"
name="review"
placeholder="Your comment"
rows="4"
required
></textarea>
<button
class="modal-rating-submit"
type="submit"
>
Send
</button>
<p
class="modal-rating-message"
hidden
></p>
</form>
</div>`}function S(e,t,n,r){if(!e||(e.innerHTML="",n<=1))return;const a=t===1,i=t===n;e.append(_("left",a),Me(t,n),_("right",i)),e.onclick=o=>{const f=o.target.closest("[data-page]");if(!f||f.disabled)return;const v=$e(f.dataset.page,t,n);v!==t&&r(v)}}function _(e,t){const n=document.createElement("div");n.classList.add("pagination-arrows"),e==="right"&&n.classList.add("pagination-arrows--right");const r=e==="left";return n.innerHTML=r?`
<button
class="pagination-arrow"
data-page="first"
${t?"disabled":""}
aria-label="First page"
>
<img
src="${t?d.chevronDoubleLeftLight:d.chevronDoubleLeftDark}"
class="pagination-arrow-icon"
>
</button>

<button
class="pagination-arrow"
data-page="prev"
${t?"disabled":""}
aria-label="Previous page"
>
<img
src="${t?d.chevronLeftLight:d.chevronLeftDark}"
class="pagination-arrow-icon"
>
</button>
`:`
<button
class="pagination-arrow"
data-page="next"
${t?"disabled":""}
aria-label="Next page"
>
<img
src="${t?d.chevronLeftLight:d.chevronLeftDark}"
class="pagination-arrow-icon"
>
</button>

<button
class="pagination-arrow"
data-page="last"
${t?"disabled":""}
aria-label="Last page"
>
<img
src="${t?d.chevronDoubleLeftLight:d.chevronDoubleLeftDark}"
class="pagination-arrow-icon"
>
</button>
`,n}function Me(e,t){const n=document.createElement("div");return n.classList.add("pagination-numbers"),qe(e,t).forEach(a=>{if(a==="..."){const o=document.createElement("span");o.className="pagination-ellipsis",o.textContent="...",n.append(o);return}const i=document.createElement("span");i.className="pagination-num",i.textContent=a,i.dataset.page=a,a===e&&i.classList.add("is-active"),n.append(i)}),n}function $e(e,t,n){switch(e){case"first":return 1;case"prev":return Math.max(1,t-1);case"next":return Math.min(n,t+1);case"last":return n;default:return parseInt(e,10)}}function qe(e,t){if(t<=4)return Array.from({length:t},(o,f)=>f+1);const n=[],r=Math.ceil(t/2);let a=Math.max(1,e-1),i=Math.min(t,e+1);if(i-a<2&&(a===1?i=Math.min(3,t):i===t&&(a=Math.max(1,t-2))),e<=r){for(let o=a;o<=i;o++)n.push(o);i<t&&n.push("...")}else{a>1&&n.push("...");for(let o=a;o<=i;o++)n.push(o)}return n}let c={container:null,input:null,button:null,callback:null};function Fe(e){c.container=document.querySelector(".exercises-search"),c.container&&(c.input=c.container.querySelector(".exercises-search-input"),c.button=c.container.querySelector(".exercises-search-btn"),c.callback=e,c.container.hidden=!1,c.input.addEventListener("keydown",H),c.button.addEventListener("click",j))}function Te(){c.container&&(c.container.hidden=!0,c.input&&(c.input.value="",c.input.removeEventListener("keydown",H)),c.button&&c.button.removeEventListener("click",j),c.container=null,c.input=null,c.button=null,c.callback=null)}function H(e){e.key==="Enter"&&(e.preventDefault(),N())}function j(){N()}function N(){if(!c.callback||!c.input)return;const e=c.input.value.trim();c.callback(e)}let s={params:{},page:1,listEl:null,paginationEl:null,goBack:null,titleEl:null};function Pe(e,t,n,r,a,i){s.listEl=r,s.paginationEl=a,s.goBack=i,s.titleEl=n,s.page=1,s.params={[t]:e,limit:10},_e(e),Fe(De),M()}function G(){var e;Te(),(e=s.listEl)==null||e.classList.remove("exercises-list--workouts")}function _e(e){if(!s.titleEl)return;s.titleEl.innerHTML=`
<span class="exercises-title-back">
Exercises
</span>
 /
<span class="exercises-title-category">
${e}
</span>`;const t=s.titleEl.querySelector(".exercises-title-back");t&&(t.style.cursor="pointer",t.addEventListener("click",Ae,{once:!0}))}function Ae(){var e;G(),s.titleEl&&(s.titleEl.innerHTML="Exercises"),(e=s.goBack)==null||e.call(s)}function De(e){s.params.keyword=e||void 0,s.page=1,M()}async function M(){if(s.listEl)try{const e=Oe(),t=await ne(e);Ie(t.results||[]),Re(t.totalPages)}catch{He()}}function Oe(){const e={...s.params,page:s.page};return Object.keys(e).forEach(t=>{e[t]===void 0&&delete e[t]}),e}function Ie(e){e.length?s.listEl.innerHTML=e.map(B).join(""):s.listEl.innerHTML=`
<li class="workout-card">
<p style="padding:20px;text-align:center;">
No exercises found.
</p>
</li>`,s.listEl.classList.add("exercises-list--workouts")}function Re(e){if(!s.paginationEl)return;const t=parseInt(e,10)||1;S(s.paginationEl,s.page,t,Be)}function Be(e){s.page=e,M()}function He(){s.listEl.innerHTML=`
<li class="workout-card">
<p style="padding:20px;text-align:center;">
Failed to load exercises.
</p>
</li>`}const je={muscles:"Muscles","body-parts":"Body parts",equipment:"Equipment"},Ne={muscles:"muscles","body-parts":"bodypart",equipment:"equipment"};let u={filter:"muscles",page:1,tabsEl:null,listEl:null,paginationEl:null,titleEl:null};function Ge(){u.tabsEl=document.querySelector(".exercises-tabs"),u.listEl=document.querySelector(".exercises-list"),u.paginationEl=document.querySelector(".exercises-grid .pagination"),u.titleEl=document.querySelector(".exercises-title"),!(!u.tabsEl||!u.listEl)&&(u.tabsEl.addEventListener("click",Ue),u.listEl.addEventListener("click",Ze),$())}function Ue(e){const t=e.target.closest(".exercises-tab");t&&(u.tabsEl.querySelectorAll(".exercises-tab").forEach(n=>n.classList.remove("is-active")),t.classList.add("is-active"),u.filter=t.dataset.filter,u.page=1,G(),u.titleEl&&(u.titleEl.innerHTML="Exercises"),$())}function Ze(e){const t=e.target.closest(".exercise-card");if(!t)return;e.preventDefault();const n=t.dataset.name,r=Ne[u.filter];Pe(n,r,u.titleEl,u.listEl,u.paginationEl,$)}function $(){U(u.filter,u.page,u.listEl,u.paginationEl)}async function U(e,t,n,r){try{const a=await te(je[e],t,12),i=a.results||[];n.innerHTML=i.length?i.map(Ee).join(""):`<li class="exercise-card">
           <p style="padding:20px;text-align:center;">
             No categories found.
           </p>
         </li>`;const o=parseInt(a.totalPages,10)||1;r&&S(r,t,o,f=>{u.page=f,U(e,f,n,r)})}catch{n.innerHTML=`
      <li class="exercise-card">
        <p style="padding:20px;text-align:center;">
          Failed to load filters.
        </p>
      </li>`}}const q="favorites",E=8;let m={list:null,pagination:null,page:1};function C(){try{const e=localStorage.getItem(q);return e?JSON.parse(e):[]}catch{return[]}}function Je(e){const t=C();t.some(n=>n._id===e._id)||(t.push(e),localStorage.setItem(q,JSON.stringify(t)))}function Z(e){const t=C().filter(n=>n._id!==e);localStorage.setItem(q,JSON.stringify(t))}function J(e){return C().some(t=>t._id===e)}function Ve(){m.list=document.querySelector(".favorites-list"),m.pagination=document.querySelector(".favorites-content .pagination"),m.list&&(m.list.addEventListener("click",Ye),F(1))}function Ye(e){const t=e.target.closest("[data-remove-id]");t&&(Z(t.dataset.removeId),F(m.page))}function F(e){m.page=e;const t=C();if(!t.length){m.list.innerHTML=`<li class="favorites-empty">
        <p>
          It appears that you haven't added any exercises to your favorites yet.
          Start exploring and add exercises that you enjoy to your favorites
          for easy access in the future.
        </p>
      </li>`,m.pagination&&(m.pagination.innerHTML="");return}const n=Math.ceil(t.length/E);m.page>n&&(m.page=n);const r=(m.page-1)*E,a=t.slice(r,r+E);m.list.innerHTML=a.map(i=>B(i,{showTrash:!0})).join(""),m.pagination&&S(m.pagination,m.page,n,F)}let g={form:null,input:null,message:null};const ze=/^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;function Ke(){g.form=document.querySelector(".footer-form"),g.form&&(g.input=g.form.querySelector(".footer-input"),g.form.addEventListener("submit",Qe))}async function Qe(e){var n;e.preventDefault();const t=(((n=g.input)==null?void 0:n.value)||"").trim();if(t){if(We(),!ze.test(t)){x("Please enter a valid email address.","error");return}try{const r=await ie(t);x((r==null?void 0:r.message)||"Subscription successful!","success"),g.input&&(g.input.value="")}catch(r){x((r==null?void 0:r.message)||"Subscription failed. Please try again.","error")}}}function We(){g.message||(g.message=g.form.querySelector(".footer-form-message"),g.message||(g.message=document.createElement("p"),g.message.classList.add("footer-form-message"),g.form.appendChild(g.message)))}function x(e,t){g.message.textContent=e,g.message.className=`footer-form-message footer-form-message--${t}`,g.message.hidden=!1}const Xe="modulepreload",et=function(e){return"/vanilla-app-template/"+e},A={},tt=function(t,n,r){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),f=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(n.map(v=>{if(v=et(v),v in A)return;A[v]=!0;const L=v.endsWith(".css"),z=L?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${z}`))return;const w=document.createElement("link");if(w.rel=L?"stylesheet":Xe,L||(w.as="script"),w.crossOrigin="",w.href=v,f&&w.setAttribute("nonce",f),document.head.appendChild(w),L)return new Promise((K,Q)=>{w.addEventListener("load",K),w.addEventListener("error",()=>Q(new Error(`Unable to preload CSS for ${v}`)))})}))}function i(o){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=o,window.dispatchEvent(f),!f.defaultPrevented)throw o}return a.then(o=>{for(const f of o||[])f.status==="rejected"&&i(f.reason);return t().catch(i)})};let l={backdrop:null,rating:0,exerciseId:null};function nt(){l.backdrop=document.querySelector("[data-modal-rating]"),l.backdrop&&(l.backdrop.addEventListener("click",rt),document.addEventListener("keydown",it))}function at(e){l.backdrop&&(l.exerciseId=e,l.rating=0,l.backdrop.innerHTML=Se(e),l.backdrop.hidden=!1,document.body.style.overflow="hidden",ot(),st())}function rt(e){(e.target===l.backdrop||e.target.closest("[data-modal-close]"))&&T()}function it(e){e.key==="Escape"&&l.backdrop&&!l.backdrop.hidden&&T()}function ot(){const e=l.backdrop.querySelectorAll("[data-star]"),t=l.backdrop.querySelector(".modal-rating-value");e.forEach(n=>{n.style.cursor="pointer",n.addEventListener("click",()=>{l.rating=parseInt(n.dataset.star,10),dt(e,l.rating),t&&(t.textContent=l.rating.toFixed(1))})})}function st(){const e=l.backdrop.querySelector(".modal-rating-form");e&&e.addEventListener("submit",ct)}async function ct(e){e.preventDefault();const t=e.target,n=t.querySelector(".modal-rating-message"),r=t.email.value.trim(),a=t.review.value.trim();if(!l.rating||!r||!a){n&&(n.textContent="Please fill in all fields: rating, email, and comment.",n.hidden=!1);return}try{await re(l.exerciseId,{rate:l.rating,email:r,review:a}),n&&(n.textContent="Thank you for your rating!",n.className="modal-rating-message modal-rating-message--success",n.hidden=!1),setTimeout(lt,1500)}catch(i){n&&(n.textContent=i.message||"Failed to send rating. Please try again.",n.className="modal-rating-message modal-rating-message--error",n.hidden=!1)}}async function lt(){T(),(await tt(()=>Promise.resolve().then(()=>yt),void 0)).openModal(l.exerciseId)}function T(){l.backdrop&&(l.backdrop.hidden=!0,l.backdrop.innerHTML="",document.body.style.overflow="")}function dt(e,t){e.forEach(n=>{const r=parseInt(n.dataset.star,10);n.src=r<=t?d.starOrange:d.starGrey})}let p={backdrop:null,exercise:null};function V(){p.backdrop=document.querySelector("[data-modal-exercise]"),p.backdrop&&(document.addEventListener("click",ut),p.backdrop.addEventListener("click",gt),document.addEventListener("keydown",ft))}function ut(e){const t=e.target.closest("[data-start-id]");t&&Y(t.dataset.startId)}function gt(e){(e.target===p.backdrop||e.target.closest("[data-modal-close]"))&&P()}function ft(e){e.key==="Escape"&&p.backdrop&&!p.backdrop.hidden&&P()}async function Y(e){try{const t=await ae(e);p.exercise=t,pt(t),mt(),vt()}catch{}}function pt(e){const t=J(e._id);p.backdrop.innerHTML=xe(e,t),p.backdrop.hidden=!1,document.body.style.overflow="hidden"}function mt(){const e=p.backdrop.querySelector("[data-fav-id]");e&&e.addEventListener("click",ht)}function ht(){const e=p.exercise._id,t=p.backdrop.querySelector("[data-fav-id] span"),n=p.backdrop.querySelector("[data-fav-id] img");J(e)?(Z(e),t&&(t.textContent="Add to favorites"),n&&(n.src=d.heartDark)):(Je(p.exercise),t&&(t.textContent="Remove"),n&&(n.src=d.heartFilledDark)),wt()}function vt(){const e=p.backdrop.querySelector("[data-rating-id]");e&&e.addEventListener("click",()=>{P(),at(e.dataset.ratingId)})}function wt(){document.querySelector(".favorites")&&window.__reinitFavorites&&window.__reinitFavorites()}function P(){p.backdrop&&(p.backdrop.hidden=!0,p.backdrop.innerHTML="",document.body.style.overflow="")}const yt=Object.freeze(Object.defineProperty({__proto__:null,initExerciseModal:V,openModal:Y},Symbol.toStringTag,{value:"Module"}));class bt{constructor(){this.dom={}}init(){this.cacheDom(),this.initModules(),this.bindEvents(),this.updateYear()}cacheDom(){this.dom.body=document.body,this.dom.menu=document.querySelector("[data-menu]"),this.dom.menuOpen=document.querySelector("[data-menu-open]"),this.dom.menuClose=document.querySelector("[data-menu-close]"),this.dom.exercisesPage=document.querySelector(".exercises"),this.dom.favoritesPage=document.querySelector(".favorites"),this.dom.year=document.querySelector("[data-year]")}initModules(){oe(),Ke(),V(),nt(),this.dom.exercisesPage&&Ge(),this.dom.favoritesPage&&Ve()}bindEvents(){var t,n;(t=this.dom.menuOpen)==null||t.addEventListener("click",()=>this.openMenu()),(n=this.dom.menuClose)==null||n.addEventListener("click",()=>this.closeMenu()),document.addEventListener("keydown",this.handleEscape.bind(this))}openMenu(){var t;(t=this.dom.menu)==null||t.classList.add("is-open"),this.dom.body.style.overflow="hidden"}closeMenu(){var t;(t=this.dom.menu)==null||t.classList.remove("is-open"),this.dom.body.style.overflow=""}handleEscape(t){t.key==="Escape"&&this.closeMenu()}updateYear(){this.dom.year&&(this.dom.year.textContent=new Date().getFullYear())}}document.addEventListener("DOMContentLoaded",()=>{new bt().init()});
//# sourceMappingURL=main-CqmMBBIz.js.map
