import Swal from "sweetalert2";

export function useAlert() {
  function openAlert({title = '', text = '', confirmText = 'Yeah!', cancelText = 'Cancel'}) {
    return Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      showCancelButton: true,
      color: "#d4d4d4",
      background: "#242424",
      confirmButtonColor: "#747474",
      cancelButtonColor: "#424242",
    });
  }

  return {openAlert};
}
