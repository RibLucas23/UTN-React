import Swal from 'sweetalert2';

export class SweetAlertService {
	showLoading(title = 'Cargando...') {
		return Swal.fire({
			title,
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	}

	closeModal() {
		Swal.close();
	}

	showError(text, title = 'Error') {
		return Swal.fire({
			icon: 'error',
			title,
			text,
		});
	}

	showWarning(text, title = 'Atención') {
		return Swal.fire({
			icon: 'warning',
			title,
			text,
		});
	}

	showConfirmation(
		text,
		title = '¿Está seguro?',
		confirmButton = 'Confirmar',
		cancelButton = 'Cancelar',
	) {
		return Swal.fire({
			title,
			text,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: confirmButton,
			cancelButtonText: cancelButton,
		});
	}

	showSuccess(text, title = 'Éxito') {
		return Swal.fire({
			icon: 'success',
			title,
			text,
		});
	}
}

export const modalService = new SweetAlertService();
