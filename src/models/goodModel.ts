export interface IGood {
    title: string;
    price: number;
    discount: number;
    description: string;
    specifications: ISpecification[];
}

export interface ISpecification {
    title: string;
    value: string;
}