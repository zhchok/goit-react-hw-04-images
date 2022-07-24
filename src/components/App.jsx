import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useEffect, useState } from "react";
import { getImages } from "services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx";
import { LoadMore } from "./LoadMore/LoadMore.jsx";
import { Searchbar } from "./Searchbar/Searchbar.jsx";
import { GlobalStyle } from "./base/GlobalStyle";
import { Box } from "./box/box";

export function App() {
	const [images, setImages] = useState([]);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [allImages, setAllImages] = useState("");

	useEffect(() => {
		if (query !== "") {
			addImage();
		}
		async function addImage() {
			setLoading(true);

			try {
				const res = await getImages(query, page);

				setImages(prevState => [...prevState, ...res.hits]);

				setAllImages(res.total);
				if (res.total === 0) {
					Notify.failure("Images not found");
					return;
				}
			} catch (error) {
				setLoading(false);
				Notify.failure("Wow error, reload page");
			} finally {
				setLoading(false);
				Loading.remove();
			}
		}
	}, [page, query]);

	const addQuery = value => {
		setQuery(value.query);
		setPage(1);
		setImages([]);
	};

	const loadMore = () => {
		setPage(prevState => prevState + 1);
	};
	return (
		<Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
			<GlobalStyle />
			<Searchbar onSubmit={addQuery} />
			{loading && Loading.dots()}
			<ImageGallery items={images} />
			{images.length > 0 && images.length < allImages && <LoadMore onClick={loadMore} />}
		</Box>
	);
}

// export class App extends Component {
// 	state = {
// 		images: [],
// 		query: "",
// 		page: 1,
// 		loading: false,
// 		allImages: "",
// 	};

// 	componentDidUpdate(_, prevState) {
// 		if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
// 			this.addImage();
// 		}
// 	}

// 	addImage = async () => {
// 		const { query, page } = this.state;
// 		this.setState({ loading: true });

// 		try {
// 			const images = await getImages(query, page);
// 			this.state.allImages = images.total;
// 			if (this.state.allImages === 0) {
// 				Notify.failure("Images not found");
// 			}

// 			this.setState(prevState => ({
// 				images: [...prevState.images, ...images.hits],
// 			}));
// 		} catch (error) {
// 			this.setState({ loading: false });
// 			Notify.failure("Wow error, reload page");
// 		} finally {
// 			this.setState({ loading: false });
// 			Loading.remove();
// 		}
// 	};

// 	addQuery = ({ query }) => {
// 		this.setState({ query, page: 1, images: [] });
// 	};

// 	loadMore = () => {
// 		this.setState(prevState => ({
// 			page: prevState.page + 1,
// 		}));
// 	};

// 	render() {
// 		const { loading, images } = this.state;
// 		return (
// 			<Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
// 				<GlobalStyle />
// 				<Searchbar onSubmit={this.addQuery} />
// 				{loading && Loading.dots()}
// 				<ImageGallery items={images} />
// 				{images.length > 0 && images.length < this.state.allImages && <LoadMore onClick={this.loadMore} />}
// 			</Box>
// 		);
// 	}
// }
