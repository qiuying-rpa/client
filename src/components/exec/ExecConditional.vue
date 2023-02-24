<template>
  <div>
    <node-shell>
      <plain-card class="relative">
        <div>如果满足全部条件</div>
      </plain-card>
    </node-shell>
    <div class="flex">
      <div>
        <div
          class="flex items-center mt-4 relative before-absolute before-content-none before-w-0.4 before-h-4 before-bg-slate before-left-8 before-top--2 before-translate-y--50%">
          <plain-card class="reactive"> 则执行 </plain-card>
          <div class="bg-slate grow-1 h-0.4" />
        </div>
        <div class="pl-8">
          <div
            class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit box-border before-top-0">
            <node-shell>
              <set-variable />
            </node-shell>
            <node-shell class="mt-4">
              <print-log />
            </node-shell>
            <node-shell class="mt-4">
              <print-log />
            </node-shell>
          </div>
        </div>
      </div>
      <div>
        <div class="pt-4">
          <plain-card> 否则执行 </plain-card>
        </div>
        <div class="pl-8">
          <div
            class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit before-top-0">
            <node-shell>
              <set-variable />
            </node-shell>
            <node-shell class="mt-4">
              <print-log />
            </node-shell>
            <node-shell class="mt-4">
              <print-log />
            </node-shell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
