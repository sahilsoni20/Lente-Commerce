import { LineItem } from '@chec/commerce.js/types/line-item';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

type CartItemProps = {
    lineItem: LineItem;
    onUpdateQuery: (lineItemId: string, quantity: number) => Promise<void>;
    onRemoveCart: (lineItemId: string) => Promise<void>;
};

export const CartItem = ({ lineItem, onUpdateQuery, onRemoveCart }: CartItemProps) => (
    <Card>
        <CardMedia
            component="img"
            image={lineItem.media.source}
            alt={lineItem.name}
            height="140"
        />
        <CardContent>
            <Typography variant="h5" component="h2">
                {lineItem.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {lineItem.line_total.formatted_with_symbol}
            </Typography>
        </CardContent>
        <CardActions>
            <Button
                size="small"
                color="primary"
                onClick={() => onUpdateQuery(lineItem.id, lineItem.quantity + 1)}
            >
                +
            </Button>
            <Typography>{lineItem.quantity}</Typography>
            <Button
                size="small"
                color="primary"
                onClick={() => onUpdateQuery(lineItem.id, lineItem.quantity - 1)}
            >
                -
            </Button>
            <Button
                size="small"
                color="secondary"
                onClick={() => onRemoveCart(lineItem.id)}
            >
                Remove
            </Button>
        </CardActions>
    </Card>
);
