import { ref, Ref } from "vue"
import addWorkDialog from "./addWorkDialog.vue"
export function addWorkHook(): ReturnType {
    const addWorkDialogRef: Ref<typeof addWorkDialog> = ref(addWorkDialog)
    const add = () => {
        addWorkDialogRef.value.open()
    }
    return {
        addWorkDialogRef,
        add
    }
}

interface ReturnType {
    add: () => void
    addWorkDialogRef: Ref<typeof addWorkDialog>
}
