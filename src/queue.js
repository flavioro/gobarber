import 'dotenv/config';

// Separa (isolamos) as filas (queue) do restante da app
import Queue from './lib/Queue';

Queue.processQueue();
