<template>
  <div class="tagline bg-slate-900">
    <div class="container relative">                
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-between">
          <ul class="list-none">
            <li class="inline-flex items-center">
              <i
                data-feather="clock"
                class="text-red-500 size-4"
              />
              <span class="ms-2 text-slate-300">Wednesday, July 22, 2026 — LDYC 2026</span>
            </li>
            <li class="inline-flex items-center ms-2">
              <i
                data-feather="map-pin"
                class="text-red-500 size-4"
              />
              <span class="ms-2 text-slate-300">Faith Plaza, Bariga</span>
            </li>
          </ul>
   
          <ul class="list-none">
            <li class="inline-flex items-center">
              <i
                data-feather="mail"
                class="text-red-500 size-4"
              />
              <a
                href="mailto:contact@example.com"
                class="ms-2 text-slate-300 hover:text-slate-200"
              >youthdirectoratedioceseoflagos@gmail.com</a>
            </li>
            <li class="inline-flex items-center ms-2">
              <ul class="list-none">
                <li class="inline-flex mb-0">
                  <a
                    href=" https://www.facebook.com/Dioceseoflagosyouth"
                    class="text-slate-300 hover:text-red-500"
                  ><i
                    data-feather="facebook"
                    class="size-4 align-middle"
                    title="facebook"
                  /></a>
                </li>
                <li class="inline-flex ms-2 mb-0">
                  <a
                    href="https://www.instagram.com/dioceseoflagosyouth/"
                    class="text-slate-300 hover:text-red-500"
                  ><i
                    data-feather="instagram"
                    class="size-4 align-middle"
                    title="instagram"
                  /></a>
                </li>
                <li class="inline-flex ms-2 mb-0">
                  <a
                    href="tel:+234 803 324 5727"
                    class="text-slate-300 hover:text-red-500"
                  ><i
                    data-feather="phone"
                    class="size-4 align-middle"
                    title="phone"
                  /></a>
                </li>
              </ul><!--end icon-->
            </li>
          </ul>
        </div>
      </div>
    </div><!--end container-->
  </div><!--end tagline-->
  <!-- TAGLINE END-->
</template>
   
   <script>
   import feather from 'feather-icons'
   export default {
     name: 'App',
     components: {
     },
     data() {
       return {
         
       }
     },
     mounted() {
       feather.replace()
     }
   }
   </script>
   
   <style>
   
   </style>