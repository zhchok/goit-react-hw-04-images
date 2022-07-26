import { Box } from "../box/box";
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";
import { useState } from "react";

export function ImageGalleryItem({ img, tags, modalImg }) {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	return (
		<Box>
			<GalleryItem onClick={toggleModal}>
				<GalleryItemImage src={img} alt={tags} />
			</GalleryItem>
			{showModal && <Modal img={modalImg} tags={tags} onCloseModal={toggleModal} />}
		</Box>
	);
}

// export class ImageGalleryItem extends Component {
// 	state = {
// 		showModal: false,
// 	};

// 	toggleModal = () => {
// 		this.setState(prevState => ({
// 			showModal: !prevState.showModal,
// 		}));
// 	};

// 	render() {
// 		const { img, tags, modalImg } = this.props;
// 		const { showModal } = this.state;
// 		return (
// 			<Box>
// 				<GalleryItem onClick={this.toggleModal}>
// 					<GalleryItemImage src={img} alt={tags} />
// 				</GalleryItem>
// 				{showModal && <Modal img={modalImg} tags={tags} onCloseModal={this.toggleModal} />}
// 			</Box>
// 		);
// 	}
// }
ImageGalleryItem.propTypes = {
	img: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
	modalImg: PropTypes.string.isRequired,
};
