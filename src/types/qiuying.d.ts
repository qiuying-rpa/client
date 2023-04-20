import ConditionItem from '@/components/designer/qiuying/ConditionItem.vue'
import DotForm from '@/components/designer/qiuying/DotForm.vue'
import ExecCircular from '@/components/designer/qiuying/ExecCircular.vue'
import ExecConditional from '@/components/designer/qiuying/ExecConditional.vue'
import ExecSequential from '@/components/designer/qiuying/ExecSequential.vue'
import HintNode from '@/components/designer/qiuying/HintNode.vue'
import KwargsForm from '@/components/designer/qiuying/KwargsForm.vue'
import NodeShell from '@/components/designer/qiuying/NodeShell.vue'
import PlainValue from '@/components/designer/qiuying/PlainValue.vue'
import PlainCard from '@/components/designer/qiuying/PlainCard.vue'
import UncertainValue from '@/components/designer/qiuying/UncertainValue.vue'
import Volatile from '@/components/designer/qiuying/Volatile.vue'


declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ConditionItem: typeof ConditionItem
    DotForm: typeof DotForm
    ExecCircular: typeof ExecCircular
    ExecConditional: typeof ExecConditional
    ExecSequential: typeof ExecSequential
    HintNode: typeof HintNode
    KwargsForm: typeof KwargsForm
    NodeShell: typeof NodeShell
    PlainValue: typeof PlainValue
    PlainCard: typeof PlainCard
    UncertainValue: typeof UncertainValue
    Volatile: typeof Volatile
  }
}