<template>
    <node-shell class="mt-4">
        <plain-card class="relative">
            <div>
                循环执行，直到条件不成立
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
    </div>
</template>
