<template>
    <node-shell class="mt-4">
        <plain-card class="relative">
            <div>
                如果满足全部条件<br>
                则执行
            </div>
        </plain-card>
    </node-shell>
    <div>
        <div class="pl-8">
            <div class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit box-border before-top-0">
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
        <plain-card>
            <div>
                否则执行
            </div>
        </plain-card>
        <div class="pl-8">
            <div class="pl-8 py-4 relative before-content-none before-w-0.4 before-h-100% before-absolute before-left-0 before-bg-slate w-fit before-top-0">
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
</template>
