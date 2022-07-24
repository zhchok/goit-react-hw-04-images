import { useEffect } from "react";
import { ModalOver, ModalWindow } from "./Modal.styled";
import PropTypes from "prop-types";

export function Modal({ onCloseModal, img, tags }) {
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.code === "Escape") {
				onCloseModal();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onCloseModal]);

	const handleBackdropClick = e => {
		if (e.currentTarget === e.target) {
			onCloseModal();
		}
	};

	return (
		<ModalOver onClick={handleBackdropClick}>
			<ModalWindow>
				<img src={img} alt={tags} />
			</ModalWindow>
		</ModalOver>
	);
}

// export class Modal extends Component {
// 	componentDidMount() {
// 		window.addEventListener("keydown", this.handleKeyDown);
// 	}

// 	componentWillUnmount() {
// 		window.removeEventListener("keydown", this.handleKeyDown);
// 	}

// 	handleKeyDown = e => {
// 		if (e.code === "Escape") {
// 			this.props.onCloseModal();
// 		}
// 	};

// 	handleBackdropClick = e => {
// 		if (e.currentTarget === e.target) {
// 			this.props.onCloseModal();
// 		}
// 	};

// 	render() {
// 		const { img, tags } = this.props;
// 		return (
// 			<ModalOver onClick={this.handleBackdropClick}>
// 				<ModalWindow>
// 					<img src={img} alt={tags} />
// 				</ModalWindow>
// 			</ModalOver>
// 		);
// 	}
// }

Modal.propTypes = {
	img: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};
