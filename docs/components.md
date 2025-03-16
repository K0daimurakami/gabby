# コンポーネント設計ドキュメント

## 概要

このプロジェクトでは、Atomic Designの原則に従ってコンポーネントを設計しています。Atomic Designは以下の階層でUIを構築します：

1. **Atoms（原子）**: 最小単位のUIコンポーネント
2. **Molecules（分子）**: 複数のAtomsを組み合わせたコンポーネント
3. **Organisms（有機体）**: 複数のMoleculesを組み合わせた複雑なコンポーネント
4. **Templates（テンプレート）**: ページのレイアウトを定義
5. **Pages（ページ）**: 実際のコンテンツを含むページ

また、Reduxを使用して状態管理を行っています。

## コンポーネント構造

### Atoms（原子）

#### Typography.tsx
- **説明**: テキスト表示のための基本コンポーネント
- **Props**:
  - `text`: 表示するテキスト
  - `variant`: テキストのスタイル（h1, h2, body1など）
  - `align`: テキストの配置（left, center, rightなど）
- **使用例**: タイトルや説明文の表示に使用

#### Image.tsx
- **説明**: 画像表示のための基本コンポーネント
- **Props**:
  - `src`: 画像のパス
  - `alt`: 代替テキスト
  - `width`: 画像の幅
  - `height`: 画像の高さ
  - `borderRadius`: 角丸の半径
- **使用例**: カード内の画像表示に使用

### Molecules（分子）

#### AgentCard.tsx
- **説明**: エージェント情報を表示するカードコンポーネント
- **使用するAtoms**:
  - Typography: タイトルと説明文の表示
  - Image: エージェント画像の表示
- **Props**:
  - `title`: エージェントのタイトル
  - `description`: エージェントの説明
  - `image`: エージェントの画像パス
- **レイアウト**:
  1. タイトル（上部）
  2. 画像（中央）
  3. 説明文（下部）

### Organisms（有機体）

#### AgentCategoryContainer.tsx
- **説明**: 特定のカテゴリーに属するエージェントカードを表示するコンテナ
- **使用するMolecules**:
  - AgentCard: 各エージェントの表示
- **Props**:
  - `title`: カテゴリーのタイトル
  - `agents`: エージェントの配列（title, description, imageを含むオブジェクト）
- **レイアウト**: カテゴリータイトルの下に複数のAgentCardをフレックスボックスで表示

#### CategoryContainer.tsx
- **説明**: 互換性のために維持されている元のカテゴリーコンテナ
- **使用するMolecules**:
  - CardItem: 各アイテムの表示
- **Props**:
  - `title`: カテゴリーのタイトル
  - `items`: 文字列の配列
- **レイアウト**: カテゴリータイトルの下に複数のCardItemを表示

### Layout（レイアウト）

#### AgentCategoryLayout.tsx
- **説明**: 複数のカテゴリーを表示するレイアウトコンポーネント
- **使用するOrganisms**:
  - AgentCategoryContainer: 各カテゴリーの表示
- **Props**:
  - `categories`: カテゴリー名をキーとし、エージェントの配列を値とするオブジェクト
  - `title`: ページのタイトル（オプション）
- **レイアウト**: ページタイトルの下に複数のAgentCategoryContainerを表示

### Pages（ページ）

#### Home.tsx
- **説明**: ホームページコンポーネント
- **使用するLayout**:
  - AgentCategoryLayout: カテゴリーの表示
- **データソース**: agent_organization.json
- **レイアウト**: AgentCategoryLayoutを使用してすべてのカテゴリーとエージェントを表示

## データフロー

1. `agent_organization.json`からカテゴリーとエージェントのデータを読み込む
2. `Home.tsx`でデータを`AgentCategoryLayout`に渡す
3. `AgentCategoryLayout`は各カテゴリーごとに`AgentCategoryContainer`を作成
4. `AgentCategoryContainer`は各エージェントごとに`AgentCard`を作成
5. `AgentCard`は`Typography`と`Image`を使用してエージェント情報を表示

## コンポーネント間の関係

```
Home
└── AgentCategoryLayout
    └── AgentCategoryContainer
        └── AgentCard
            ├── Typography (タイトル)
            ├── Image
            └── Typography (説明文)
```

## 拡張方法

新しいエージェントやカテゴリーを追加するには、`agent_organization.json`ファイルを更新するだけで済みます。コンポーネント構造は変更する必要はありません。

新しいタイプのカードやコンテナが必要な場合は、既存のコンポーネントをモデルとして使用し、Atomic Designの原則に従って新しいコンポーネントを作成してください。