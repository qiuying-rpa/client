<template>
  <div
    class="pl-8 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit">
    <node-shell>
      <set-variable />
    </node-shell>
    <node-shell class="mt-4">
      <print-log />
    </node-shell>
    <node-shell class="mt-4">
      <print-log />
    </node-shell>
    <exec-conditional class="mt-4" />
    <node-shell class="mt-4">
      <print-log />
    </node-shell>
    <exec-circular />
  </div>
</template>
